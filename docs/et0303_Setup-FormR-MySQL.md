
<style>
    body { font-size:  12pt; }  /* 10pt is the default size */
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
    [![Install MySQL](./images/et0303-01_Install-MySQL.png#img1)]('./images/et0303-01_Install-MySQL.mp4'  "Install MySQL")


### 2. Secure MySQL  

 1. Lock down MySQL
    Running this script will ask you to 
      - Enter a "password validation policy level": 2 
      - Enter a password for the user, root, to login to MySQL: Washington!1234
      - Remove anonymous users? Yes
      - Disallow root login remotely? No (Yes on a production server)
      - Remove test database and access to it? No (ditto)
      - Reload privilege tables now? Yes 

    ```
    sudo mysql_secure_installation
    ```
    [![Secure MySQL](images/et0303-02_Secure-MySQL.png#img1)](images/et0303-02_Secure-MySQL.mp4  "Secure MySQL")    


 2. Enable root to use MySQL shell. First login doesn't require a password (?).
     ```
     sudo mysql

     mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
         +------------------+-------------------------------------------+-----------------------+-----------+
         | user             | authentication_string                     | plugin                | host      |
         +------------------+-------------------------------------------+-----------------------+-----------+
         | root             |                                           | auth_socket           | localhost |
         | mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
         | mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
         | debian-sys-maint | *3A18876D8D1027DC37AAE3FA14D6C9A22FBA3ED3 | mysql_native_password | localhost |
         +------------------+-------------------------------------------+-----------------------+-----------+
         4 rows in set (0.00 sec)

     mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Scn.adm216';
     mysql> FLUSH PRIVILEGES;
     mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
        +------------------+-------------------------------------------+-----------------------+-----------+
        | user             | authentication_string                     | plugin                | host      |
        +------------------+-------------------------------------------+-----------------------+-----------+
        | root             | *13B429B7780A66DCEF0B336DF32C025CF0D97496 | mysql_native_password | localhost |
        | mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
        | mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
        | debian-sys-maint | *3A18876D8D1027DC37AAE3FA14D6C9A22FBA3ED3 | mysql_native_password  localhost |
        +------------------+-------------------------------------------+-----------------------+-----------+
        4 rows in set (0.00 sec)

     mysql> EXIT;

        Bye

 5. Stop, Start and check status of MySQL
      ```
      sudo systemctl stop mysql
      sudo systemctl start mysql
      sudo systemctl status mysql.service

         mysql.service - MySQL Community Server
            Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
            Active: active (running) since Tue 2020-12-29 03:10:26 UTC; 24s ago
           Process: 16541 ExecStart=/usr/sbin/mysqld --daemonize --pid-file=/run/mysqld/mysqld.pid (code=exited, status=
           Process: 16518 ExecStartPre=/usr/share/mysql/mysql-systemd-start pre (code=exited, status=0/SUCCESS)
          Main PID: 16543 (mysqld)
             Tasks: 27 (limit: 1140)
            CGroup: /system.slice/mysql.service
                    +-16543 /usr/sbin/mysqld --daemonize --pid-file=/run/mysqld/mysqld.pid

         Dec 29 03:10:26 ip-172-31-30-151 systemd[1]: Starting MySQL Community Server...
         Dec 29 03:10:26 ip-172-31-30-151 systemd[1]: Started MySQL Community Server.
      ```

 6. sudo mysqladmin -p -u root version

        mysqladmin  Ver 8.42 Distrib 5.7.32, for Linux on x86_64
        Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

        Oracle is a registered trademark of Oracle Corporation and/or its
        affiliates. Other names may be trademarks of their respective
        owners.

        Server version          5.7.32-0ubuntu0.18.04.1
        Protocol version        10
        Connection              Localhost via UNIX socket
        UNIX socket             /var/run/mysqld/mysqld.sock
        Uptime:                 4 min 7 sec

        Threads: 1  Questions: 2  Slow queries: 0  Opens: 105  Flush tables: 1  Open tables: 98  Queries per second avg: 0.008
    ```

 7. Allow remote access to MySQL
    ```
    nano /etc/mysql/mysql.conf.d/mysqld.cnf

      Change line:
        bind-address            = 127.0.0.1
      to:
        bind-address            = 0.0.0.0

    sudo systemctl restart mysql.service

    sudo netstat -tulnp | grep mysql

        tcp  0   0 0.0.0.0:3306    0.0.0.0:*   LISTEN      16802/mysqld

    sudo mysql -p
        password: Scn.adm216

    mysql> CREATE USER 'sco'@'%' IDENTIFIED WITH mysql_native_password BY 'Scn.dbo216';
    mysql> CREATE USER 'robin'@'69.251.71.138' IDENTIFIED WITH mysql_native_password BY 'Scn.rnr216';

    mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;

        +------------------+-------------------------------------------+-----------------------+---------------+
        | user             | authentication_string                     | plugin                | host          |
        +------------------+-------------------------------------------+-----------------------+---------------+
        | root             | *13B429B7780A66DCEF0B336DF32C025CF0D97496 | mysql_native_password | localhost     |
        | mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost     |
        | mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost     |
        | debian-sys-maint | *3A18876D8D1027DC37AAE3FA14D6C9A22FBA3ED3 | mysql_native_password | localhost     |
        | sco              | *91DE2D914E5541862E3C7A2FAD3AADB4E60A81E6 | mysql_native_password | %             |
        | robin            | *F641B7862AF80A43A038893D3F08D8A014EC2387 | mysql_native_password | 69.251.71.138 |
        +------------------+-------------------------------------------+-----------------------+---------------+
        6 rows in set (0.00 sec)

    mysql> EXIT
    ```

 8. Grant ALL privileges to Users, robin and bruce
    Note: after granting ALL privileges to robin, I was able to remotely create users,
          but I could only grant ALL privileges to bruce when logged in as root via the server command line.
    ```
    sudo mysql -p
    mysql> CREATE USER 'io'@'%'    IDENTIFIED WITH mysql_native_password BY 'IO.usr216';
    mysql> CREATE USER 'bruce'@'%' IDENTIFIED WITH mysql_native_password BY 'IO.btr216';
    mysql> GRANT ALL PRIVILEGES ON *.* TO 'robin'@'69.251.71.138';
    mysql> GRANT ALL PRIVILEGES ON *.* TO 'bruce'@'%';

    mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;

        +------------------+-------------------------------------------+-----------------------+---------------+
        | user             | authentication_string                     | plugin                | host          |
        +------------------+-------------------------------------------+-----------------------+---------------+
        | root             | *13B429B7780A66DCEF0B336DF32C025CF0D97496 | mysql_native_password | localhost     |
        | mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost     |
        | mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost     |
        | debian-sys-maint | *3A18876D8D1027DC37AAE3FA14D6C9A22FBA3ED3 | mysql_native_password | localhost     |
        | sco              | *91DE2D914E5541862E3C7A2FAD3AADB4E60A81E6 | mysql_native_password | %             |
        | robin            | *F641B7862AF80A43A038893D3F08D8A014EC2387 | mysql_native_password | 69.251.71.138 |
        | io               | *AA30383F7F91857E5E250F35681C4C3CF51D3F90 | mysql_native_password | %             |
        | bruce            | *B52E6D6CC6CA47DF4A1C8C5F26BC56554B8F2A63 | mysql_native_password | %             |
        +------------------+-------------------------------------------+-----------------------+---------------+
        8 rows in set (0.00 sec)

    ```
 9. Open firewall rule for port 3306
    ```
    sudo ufw allow 3306/tcp
        Rule added
        Rule added (v6)
    ```

10. Check remote access to MySQL
    ```
    telnet 192.168.1.10 3306
    ```

11. Login remotely with MySQL Shell. You can save the password and not need it on subsequent logins.
    ```
    mysqlsh --uri robin@13.57.57.151:3306

        Please provide the password for 'robin@13.57.57.151:3306': **********
        Save password for 'robin@13.57.57.151:3306'? [Y]es/[N]o/Ne[v]er (default No): yes

        MySQL Shell 8.0.22

        Copyright (c) 2016, 2020, Oracle and/or its affiliates.
        Oracle is a registered trademark of Oracle Corporation and/or its affiliates.
        Other names may be trademarks of their respective owners.

        Type '\help' or '\?' for help; '\quit' to exit.
        Creating a session to 'robin@13.57.57.151:3306'
        Fetching schema names for autocompletion... Press ^C to stop.
        Your MySQL connection id is 74
        Server version: 5.7.32-0ubuntu0.18.04.1 (Ubuntu)
        No default schema selected; type \use <schema> to set one.

        MySQL  13.57.57.151:3306 ssl  JS > \quit
        Bye!

    mysqlsh --uri robin@13.57.57.151:3306

        MySQL Shell 8.0.22

        Copyright (c) 2016, 2020, Oracle and/or its affiliates.
        Oracle is a registered trademark of Oracle Corporation and/or its affiliates.
        Other names may be trademarks of their respective owners.

        Type '\help' or '\?' for help; '\quit' to exit.
        Creating a session to 'robin@13.57.57.151:3306'
        Fetching schema names for autocompletion... Press ^C to stop.
        Your MySQL connection id is 77
        Server version: 5.7.32-0ubuntu0.18.04.1 (Ubuntu)
        No default schema selected; type \use <schema> to set one.

        MySQL  13.57.57.151:3306 ssl  JS > \sql SELECT user,authentication_string,plugin,host FROM mysql.user;

        MySQL  13.57.57.151:3306 ssl  JS > \sql select * from mysql.user;

            ERROR: 1142 (42000): SELECT command denied to user 'robin'@'c-69-251-71-138.hsd1.va.comcast.net' for table 'user'
    ```

12. Check disk usage and that MySQL is running
    ```
    df
        Filesystem     1K-blocks    Used Available Use% Mounted on
        udev              486744       0    486744   0% /dev
        tmpfs             100212     772     99440   1% /run
        /dev/xvda1       8065444 1868284   6180776  24% /
        tmpfs             501060       0    501060   0% /dev/shm
        tmpfs               5120       0      5120   0% /run/lock
        tmpfs             501060       0    501060   0% /sys/fs/cgroup
        /dev/loop0        100096  100096         0 100% /snap/core/10185
        /dev/loop1         28800   28800         0 100% /snap/amazon-ssm-agent/2012
        tmpfs             100212       0    100212   0% /run/user/1000

    ps -aux | awk /mysqld/

        ubuntu    2718  0.0  0.3   26060   3080 pts/0  S+   18:46   0:00 awk /mysqld/
        mysql    16915  0.0 19.4 1177276 194940 ?      Sl   04:36   0:21 /usr/sbin/mysqld --daemonize --pid-file=/run/mysqld/mysqld.pid
    ```




