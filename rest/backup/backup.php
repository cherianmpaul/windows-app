<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

//Load Composer's autoloader
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Check if an email address was sent, If so send backup to the email addres.
if (strpos($_GET["email"], '@') !== false and strpos($_GET["email"], '.') !== false) {

	// Create the mysql backup file
	$dbhost = "localhost"; // usually localhost
	$dbuser = "username";
	$dbpass = "password";
	$dbname = "database_name";

	$backupfile = $dbname . date("Y-m-d") . '.sql';
	$backupzip = $backupfile . '.tar.gz';
	system("mysqldump -h $dbhost -u $dbuser -p$dbpass $dbname > $backupfile");
	system("tar -czvf $backupzip $backupfile");

	// Mail the file

	$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
	try {
	    //Server settings
	    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
	    $mail->isSMTP();                                      // Set mailer to use SMTP
	    $mail->Host = 'mail.mailhost.com';             		  // Specify main and backup SMTP servers
	    $mail->SMTPAuth = true;                               // Enable SMTP authentication
	    $mail->Username = 'username';            			  // SMTP username
	    $mail->Password = 'password';                         // SMTP password
	    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	    $mail->Port = 587;                                    // TCP port to connect to

	    //Recipients
	    $mail->setFrom('sender_email@mailhost.com', 'Data Backup');
	    $mail->addAddress(htmlspecialchars($_GET["email"]));     // Add a recipient

	    //Attachments
	    $mail->addAttachment($backupzip);         // Add attachments

	    //Content
	    $mail->isHTML(true);                                  // Set email format to HTML
	    $mail->Subject = 'Subject of the email';
	    $mail->Body    = 'This is the content of the email. You can type your email message here.';

	    $mail->send();
	    echo ' file has been sent to '.htmlspecialchars($_GET["email"]);
	} catch (Exception $e) {
	    echo ' file could not be sent. Mailer Error: ', $mail->ErrorInfo;
	}


	// Delete the files from your server
	unlink($backupfile);
	unlink($backupzip); 
}

?>
