<style>
    body { font-size:  15pt; }  /* 10pt is the default size */
    p  { line-height: 1.2em; }  /* 1.4em is the default line-height */
    p  { margin:        0em; }  /* .5em is the default top and bottom margin */

    img[src*="#img1"] {
         width:        600px;
         margin:       5px  0px 15px 40px;    /* top, right, bottom, left */
         box-shadow:   5px 10px 12px  4px #888888;
         }
    img[src*="#img2"] {
         width:        500px;
         margin:       5px  0px 15px 40px;    /* top, right, bottom, left */
         box-shadow:   5px 10px 12px  4px #888888;
        }
    img[src*="#img3"] {
         width:        300px;
         margin:       5px  0px 15px 40px;    /* top, right, bottom, left */
         box-shadow:   5px 10px 12px  4px #888888;
        }
</style>

## Instructions for creating a VM on Vultr

### 1. Signin or create an account on vultr.com

### 2. Deploy new Server (Create Instance)

[![Vultr Create Instance](images/et0202-01_Vultr-Create-Instance.png#img2)](images/et0202-01_Vultr-Create-Instance.mp4 "Setup Vultr")

1. Choose Server: Cloud Compute
2. Server Location: Atlanta
3. Server Type: Ubuntu 18.04 x64
4. Server Size: 25GB SSD  $5/mo.
5. Add SSH Key
    + Select an Existing Key, or
    + Use Puttygen to create or import your existing public key and cut and paste it from puttygen into the vultr form.

![PuttyGen-Public key](images/et0202-03_PuttyGen-highlight-for-paste.png#img2 "PuttyGen-Public key")

![Vultr-Add SSH key, Blank](images/et0202-04_Vultr-add-SSH-key-blank.png#img3 "Blank Key")

![Vultr-Add SSH keyTest](images/et0202-05_Vultr-add-SSH-key-pasted.png#img3 "Pasted Key")


6. Server Host Name and Label: FormRx-Vultr for both

7. Click Deploy Now


### 3. Open Vultr VM Console

[![Vultr Open Console](images/et0202-06_Vultr-console.png#img1)](images/et0202-06_Vultr-console.mp4 "Vultr Open Console")


+ Click on Products
+ then the Server Name i.e. FormRx-Vultr
+ then the View Console icon

1. Click in the console window and then enter login: root and press enter.

2. From the Vultr server window click the copy password icon.

3. Go back to the console window click the Send clipboard button and press enter.

You will see the Welcome screen for Ubuntu and the command prompt:

    root@FormRx-Vultr:~#

### 4. Download and/or open Bitvise SSH / SFTP browser.


[![Setup Bitvise](images/et0202-02_Bitvise_Setup.png#img1_Bitvise_Setup.png)](images/et0202-02_Bitvise_Setup.mp4 "Setup Bitvise")


 1. Save file immediately as FormRx-Vultr

 2. Enter Host: 45.32.219.12 (get from Vultr window)

 3. Enter Username: root

 4. Initial Method: publickey+password

 5. Select Client Key from 2.

 7. Check store encrypted password in profile, then enter root password form Vultr window.

 8. Click the Options tab and On Login check Open Terminal and Open SFTP

 9. Click Save Profile

10. Click the Login Button.
    You will be presented with Console and SFTP windows.

