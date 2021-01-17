
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

Setup Instructions for VM with MySQL on Vultr

### 1. Install MySQL

 1. Install MySQL after first updating the APT Package catalog. When the installations is complete, check the version to see if it installed properly.
     ```
     $ apt-get update
     $ apt-get install mysql-server
     $ mysql --version
       mysql  Ver 14.14 Distrib 5.7.32, for Linux (x86_64) using  EditLine wrapper
      ```
    [![Install MySQL](images/et0303-01_Install-MySQL.png#img1)](images/et0303-01_Install-MySQL.mp4  "Install MySQL")
<<<<<<< HEAD
=======
    - [Install MySQL Video](images/et0303-01_Install-MySQL.mp4)
    - [Run first setup script](images/et0302-03_Run-first-setup-script.png "Run first setup script")
>>>>>>> c12d42a6788b2d6eaec776f30c58acab46f2345f

### 2. Secure MySQL

 1. Lock down MySQL
    Running this script will ask you to
      - Enter a "password validation policy level": 2
      - Enter a password for the user, root, to login to MySQL: xxxxxx
      - Remove anonymous users? Yes
      - Disallow root login remotely? No (Yes on a production server)
      - Remove test database and access to it? No (ditto)
      - Reload privilege tables now? Yes

    ```
    sudo mysql_secure_installation
    ```
    [![Secure MySQL](images/et0303-02_Secure-MySQL.png#img1)](images/et0303-02_Secure-MySQL.mp4  "Secure MySQL")


 2. Enable root to use MySQL shell. First login doesn't require a password.
    ```
     sudo mysql

     mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;

    ```

    ![Mysql-setup-select-user-empty-root](images/et0303-03_Mysql-setup-select-user-empty-root.png#img1 "Mysql-setup-select-user-empty-root")

     mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxxxxxxx';
     mysql> FLUSH PRIVILEGES;
     mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;


    ![Mysql-setup-select-user-root-updated](images/et0303-04_Mysql-setup-select-user-root-updated.png#img1 "Mysql-setup-select-user-root-updated")

 3. Stop, Start and check status of MySQL
      ```
      sudo systemctl stop mysql
      sudo systemctl start mysql
      sudo systemctl status mysql.service
    ```

    ![Mysql-setup-check-status](images/et0303-05_Mysql-setup-check-status.png#img1 "Mysql-setup-check-status")


 4. Check MySql version.
    ```
    sudo mysqladmin -p -u root version

    ```

    ![Mysql-setup-check-version](images/et0303-06_Mysql-setup-check-version.png#img1 "Mysql-setup-check-version")


 5. Allow remote access to MySQL
    ```
    nano /etc/mysql/mysql.conf.d/mysqld.cnf

      Change line:         bind-address            = 127.0.0.1
      to:                  bind-address            = 0.0.0.0
    ```
    ![Mysql-setup-nano-bind-address](images/et0303-07_Mysql-setup-nano-bind-address.png#img1 "Mysql-setup-nano-bind-address")

    ```
    sudo systemctl restart mysql.service
    sudo netstat -tulnp | grep mysql
    ```

    ![Mysql-setup-allow-remote-access](images/et0303-08_Mysql-setup-allow-remote-access.png#img1 "Mysql-setup-allow-remote-access")

 6. Open firewall rule for port 3306
    ```
    sudo ufw allow 3306/tcp
    ```
    ![Mysql-setup-open-firewall-port-3360](images/et0303-09_Mysql-setup-open-firewall-port-3360.png#img1 "Mysql-setup-open-firewall-port-3360")

 7. Check remote access to MySQL
    ```
    telnet 192.168.1.10 3306
    ```

    ![Mysql-setup-telnet](images/et0303-10_Mysql-setup-telnet.png#img1 "Mysql-setup-telnet")

 8. Create and Grant Privileges to user account: admin with host %
    ```
    sudo mysql -p
        password: xxxxxxxxxx

    mysql> CREATE USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'Washington!12345';
    mysql> GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';
    mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;

    ```
    ![Mysql-setup-create-admin](images/et0303-11_Mysql-setup-create-admin.png#img1 "Mysql-setup-create-admin")


 10. Login as admin remotely from your local PC with MySQL Shell. Don't save the password
    ```
    mysqlsh \connect admin@45.32.219.12:3306

    mysqlsh \sql SELECT user,authentication_string,plugin,host FROM mysql.user;
    ```
    ![Mysql-setup-login-admin-mysqlsh-local](images/et0303-12_Mysql-setup-login-admin-mysqlsh-local.png#img1 "Mysql-setup-login-admin-mysqlsh-local")

 11. From VM console check disk usage and that MySQL is running
    ```
    df

    ps -aux | awk /mysqld/
    ```
    ![Mysql-setup-VM-console-df-ps](images/et0303-13_Mysql-setup-VM-console-df-ps.png#img1 "Mysql-setup-VM-console-df-ps")


 12. workbench

 install
 login
 create accounts
 dev1, dev2 by ip


