
<style>
    body { font-size:  15pt; }  /* 10pt is the default size */
    p  { line-height: 1.2em; }  /* 1.4em is the default line-height */
    p  { margin:        0em; }  /* .5em is the default top and bottom margin */

    img[src*="#img1"] {
         width:        600px;
         margin:       15px 0px 15px 40px;    /* top, right, bottom, left */
         box-shadow:   5px 10px 12px  4px #888888;
         }

    img[src*="#img2"] {
         width:        500px;
         margin:       15px 0px 15px 40px;    /* top, right, bottom, left */
         box-shadow:   5px 10px 12px  4px #888888;
        }
</style>

## Setup Instructions for VM with NodeJS on Linux

### 1. References
  See Video: https://www.youtube.com/watch?v=FanoTGjkxhQ&t=1135s
  Blog: https://jasonwatmore.com/post/2019/11/18/react-nodejs-on-aws-how-to-deploy-a-mern-stack-app-to-amazon-ec2


### 2. Login to Linux Server
 1. Open Bitvise and Bitvise Profile for Server
 2. Login
    An SFTP window will open for editing and moving files to and from the remote Linux server.  An SSH window will also open for executing commands in the Linux console.

    [![Login with Bitvise](images/et0302-01_SSH-into-FormR-Server.png#img2)](images/et0302-01_SSH-into-FormR-Server.mp4 "Setup Bitvise")

    A local folder for the VM should exist and be set as the local initial directory under the SFTP tab. This folder should contain the top level folders on the remote server that you will be working with.

### 3. Prepare Scripts directory
 1. In the Windows File Explorer, copy two linux shell scripts from the `.\FormR\Master\_docs` folder into the local SFTP folder, `..\VMs\et217\home\_0\bin`. The two scripts are
    ```
    setup-nodejs-server-on-ubuntu-1804.sh
    setup-script-path-on-linux.sh
    ```
 2. In the remote side of the SFTP window, navigate to the `/home` directory and create a folder, `/home/_0/bin`, for executing scripts in the Linux server.
    - This can be done by right clicking anywhere in the `/home` directory and selecting the `Create folder` command and entering `_0` for its name.  Then create a folder named, `bin` in the `_0` folder.
    - This can also be done in the SSH window by executing the following command in the `/root` directory.
      ```
      $ mkdir /home/_0; mkdir /home/_0/bin
      ```
 3. From the local side of the SFTP window, upload the two scripts from the local `.\home\_0\bin` folder to the remote `/home/_0/bin` folder

     [![Download Scripts](images/et0302-02_Copy-2-scripts-to-FormR-Server.png#img1)](images/et0302-02_Copy-2-scripts-to-FormR-Server.mp4 "Download Scripts")

 4. To run the scripts you need to make them executable by issuing the `chmod` command in the remote SSH console.  You'll then run the script, `setup-script-path-on-linux.sh`, which will create a test script, `hello.sh`, in the `/home/_0/bin` folder and put it all three scripts into the path for all users.
   ```
   $ chmod 777 /home/_0/bin
   $ /home/_0/bin/setup-script-path-on-linux.sh
   ```
 5. One final step to prepare the scripts directory.  You need to logout of the remote server back in the Bitvise profile window, and login again.  Then you should be able to run the test script, hello.sh, from any directory in the remote SSH console:
    ```
    $ hello.sh
    ```
    ![Run First Setup Script](images/et0302-03_Run-first-setup-script.png#img1 "Run First Setup Script")

### 4. Run the script to install NodeJS, NGinx and PM2

 1. Execute the script written by Jason Watmor.  I have edited out the installation of the MongoDB server program.
     ```
     $ setup-nodejs-server-on-ubuntu-1804.sh
     ```
    [![Install NodeJS](images/et0302-04_Install-NodeJS.png#img1)](images/et0302-04_Install-NodeJS.mp4 "Install NodeJS")

