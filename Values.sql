USE lost_found_db;

INSERT INTO USERS VALUES 
(1,'Abhay','abhay@gmail.com','9999999999','student','CSE'),
(2,'Admin','admin@gmail.com','8888888888','admin','Office'),
(3,'Rohit','rohit@gmail.com','7777777777','student','ECE'),
(4,'Priya','priya@gmail.com','6666666666','student','IT'),
(5,'Amit','amit@gmail.com','5555555555','staff','Admin'),
(6,'Neha','neha@gmail.com','4444444444','student','CSE'),
(7,'Karan','karan@gmail.com','3333333333','student','ME'),
(8,'Security','security@gmail.com','2222222222','staff','Security'),
(9,'Faculty1','faculty1@gmail.com','1111111111','staff','ECE'),
(10,'Faculty2','faculty2@gmail.com','0000000000','staff','IT');


INSERT INTO LOST_ITEMS VALUES
(1,3,'Phone','Electronics','iPhone 13 lost','Cafeteria',CURDATE(),'open'),
(2,4,'Bag','Personal','Blue backpack','Bus Stop',CURDATE(),'open'),
(3,6,'Watch','Accessories','Smart watch','Gym',CURDATE(),'open'),
(4,7,'Calculator','Study','Casio fx-991ES','Classroom',CURDATE(),'open'),
(5,1,'ID Card','Documents','College ID missing','Library',CURDATE(),'open'),
(6,3,'Earbuds','Electronics','Wireless earbuds','Hostel',CURDATE(),'open');

INSERT INTO FOUND_ITEMS VALUES
(1,8,'Phone','Electronics','Found near cafeteria','Cafeteria',CURDATE(),'available'),
(2,8,'Bag','Personal','Found near bus stop','Bus Stop',CURDATE(),'available'),
(3,2,'Watch','Accessories','Found in gym','Gym',CURDATE(),'available'),
(4,5,'Calculator','Study','Found in classroom','Classroom',CURDATE(),'available'),
(5,9,'ID Card','Documents','Found in library','Library',CURDATE(),'available'),
(6,10,'Earbuds','Electronics','Found in hostel','Hostel',CURDATE(),'available');

INSERT INTO CLAIMS VALUES
(1,1,1,3,CURDATE(),'pending'),
(2,2,2,4,CURDATE(),'pending'),
(3,3,3,6,CURDATE(),'pending'),
(4,4,4,7,CURDATE(),'pending'),
(5,5,5,1,CURDATE(),'pending'),
(6,6,6,3,CURDATE(),'pending');

INSERT INTO CLAIMANT_VERIFICATION VALUES
(1,1,3,'college_id','CSE123','ID card submitted','proof1.jpg','pending',2,NULL),
(2,2,4,'college_id','IT456','ID card submitted','proof2.jpg','pending',2,NULL),
(3,3,6,'college_id','CSE789','ID card submitted','proof3.jpg','pending',2,NULL),
(4,4,7,'college_id','ME101','ID card submitted','proof4.jpg','pending',2,NULL),
(5,5,1,'college_id','CSE111','ID card submitted','proof5.jpg','pending',2,NULL),
(6,6,3,'college_id','ECE222','ID card submitted','proof6.jpg','pending',2,NULL);


