<?php

$error_message = "We are sorry, but there appears to be a problem with the form you submitted.";

function terminate($error) {
  echo "We are very sorry, but there were error(s) found with the form you submitted. "; 
  echo "These errors appear below.<br /><br />"; 
  echo $error, "<br /><br />"; 
  echo "Please go back and fix these errors.<br /><br />"; 
  die(); 
}

function clean_string($string) { 
  $bad = array("content-type","bcc:","to:","cc:","href"); 
  return str_replace($bad,"",$string);
}
 
if(isset($_POST['frm_Email'])) {     
  // validation expected data exists 
  if(!isset($_POST['frm_Name']) || 
      !isset($_POST['frm_Email']) || 
      !isset($_POST['frm_Phone_Num']) || 
      !isset($_POST['frm_Comment'])) { 
      terminate($error_message);      
  }

  $email_to = "danielwaifitness@gmail.com"; 
  $email_subject = "Website Contact";  
  $name = $_POST['frm_Name'];
  $email_from = $_POST['frm_Email']; 
  $telephone = $_POST['frm_Phone_Num']; 
  $comments = $_POST['frm_Comment'];

  $error_message = "";
  $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) { 
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />'; 
  }
 
  $string_exp = "/^[A-Za-z .'-]+$/"; 
  if(!preg_match($string_exp,$name)) { 
    $error_message .= 'The First Name you entered does not appear to be valid.<br />'; 
  }

  if(strlen($comments) < 2) { 
    $error_message .= 'The Comments you entered do not appear to be valid.<br />'; 
  }
 
  if(strlen($error_message) > 0) { 
    died($error_message); 
  }
 
  $email_message = "Form details below.\n\n";
  $email_message .= "Name: ".clean_string($name)."\n";  
  $email_message .= "Email: ".clean_string($email_from)."\n"; 
  $email_message .= "Telephone: ".clean_string($telephone)."\n"; 
  $email_message .= "Comments: ".clean_string($comments)."\n";     
        
  // create email headers
  $headers = 'From: '.$email_from."\r\n". 
  'Reply-To: '.$email_from."\r\n" . 
  'X-Mailer: PHP/' . phpversion(); 
  mail($email_to, $email_subject, $email_message, $headers); 
?>

Thank you for contacting us. We will be in touch with you very soon.
 <form action="#">
    <input type="submit" value="Return to Daniel Wai Fitness">
</form>
<?php
} else {
  echo $error_message;
}
?>
