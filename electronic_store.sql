-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2022 at 03:39 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `electronic_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `BrandID` int(11) NOT NULL,
  `BrandName` varchar(100) NOT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `CateID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`BrandID`, `BrandName`, `Image`, `Description`, `CateID`) VALUES
(3, 'iPhone', NULL, NULL, 1),
(4, 'Samsung', NULL, NULL, 1),
(7, 'MacBook', NULL, NULL, 2),
(8, 'Asus', NULL, NULL, 2),
(9, 'iPad', NULL, NULL, 3),
(10, 'Samsung', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(100) NOT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryID`, `CategoryName`, `Image`, `Description`) VALUES
(1, 'Smartphone', NULL, NULL),
(2, 'Laptop', NULL, NULL),
(3, 'Tablet', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `CouponID` int(11) NOT NULL,
  `CouponName` varchar(100) NOT NULL,
  `Percent` double NOT NULL DEFAULT 0,
  `Price` double NOT NULL DEFAULT 0,
  `MinimumApply` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`CouponID`, `CouponName`, `Percent`, `Price`, `MinimumApply`) VALUES
(1, '20% off for orders of 500 or more', 20, 0, 500),
(2, '200 off for orders of 1000 or more', 0, 200, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerID` int(11) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Password` varchar(150) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `Address` text NOT NULL,
  `RankID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customercoupon`
--

CREATE TABLE `customercoupon` (
  `CustomerD` int(11) NOT NULL,
  `CouponID` int(11) NOT NULL,
  `IsUsed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `DiscountID` int(11) NOT NULL,
  `DiscountName` varchar(100) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `discountdetail`
--

CREATE TABLE `discountdetail` (
  `DiscountID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Percent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `EmployeeID` int(11) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Phone` int(15) NOT NULL,
  `RoleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `OrderID` int(11) NOT NULL,
  `FullName` varchar(200) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `DateOrder` date NOT NULL,
  `Address` text NOT NULL,
  `City` varchar(100) NOT NULL,
  `PaymentMethod` varchar(100) NOT NULL,
  `IsPaid` tinyint(1) NOT NULL DEFAULT 0,
  `PaidAt` date NOT NULL,
  `IsDelivered` tinyint(1) NOT NULL DEFAULT 0,
  `DeliveredAt` date NOT NULL,
  `ItemsPrice` double NOT NULL,
  `ShippingPrice` double NOT NULL,
  `TaxPrice` double NOT NULL,
  `TotalPrice` double NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `EmployeeID` int(11) DEFAULT NULL,
  `StatusID` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` double NOT NULL,
  `Subtotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderstatus`
--

CREATE TABLE `orderstatus` (
  `StatusID` int(11) NOT NULL,
  `StatusName` varchar(100) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderstatus`
--

INSERT INTO `orderstatus` (`StatusID`, `StatusName`, `Description`) VALUES
(1, 'New', 'The order just had been placed'),
(2, 'Confirmed', 'The order had been confirmed by employee'),
(3, 'Packed', 'The order had been packed by employee'),
(4, 'Delivering', 'The order is in a process of delivering'),
(5, 'Delivered Successfully', 'The order had been delivered successfully'),
(6, 'Failed', 'The order had been rejected or delivery failed');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(150) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` double NOT NULL,
  `Image` varchar(250) NOT NULL,
  `ScreenSize` double NOT NULL,
  `FrontCamera` int(11) DEFAULT NULL,
  `RearCamera` int(11) DEFAULT NULL,
  `OS` varchar(100) NOT NULL,
  `CPU` varchar(100) NOT NULL,
  `GPU` varchar(100) NOT NULL,
  `Ram` int(11) NOT NULL,
  `Rom` int(11) NOT NULL,
  `ConnectTech` varchar(200) NOT NULL,
  `BatteryCapacity` int(11) NOT NULL,
  `DateReleased` date NOT NULL,
  `Description` text NOT NULL,
  `CateID` int(11) NOT NULL,
  `BrandID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `productimage`
--

CREATE TABLE `productimage` (
  `ProductID` int(11) NOT NULL,
  `Image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rank`
--

CREATE TABLE `rank` (
  `RankID` int(11) NOT NULL,
  `RankName` varchar(100) NOT NULL,
  `IsFreeShip` tinyint(1) NOT NULL,
  `MinimumApply` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rank`
--

INSERT INTO `rank` (`RankID`, `RankName`, `IsFreeShip`, `MinimumApply`) VALUES
(1, 'Bronze', 0, 0),
(2, 'Silver', 1, 500),
(3, 'Gold', 1, 250);

-- --------------------------------------------------------

--
-- Table structure for table `receivedetail`
--

CREATE TABLE `receivedetail` (
  `ReceiveID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` double NOT NULL,
  `Subtotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `receivenote`
--

CREATE TABLE `receivenote` (
  `ReceiveID` int(11) NOT NULL,
  `EmployeeID` int(11) NOT NULL,
  `DateReceive` date NOT NULL,
  `TotalQuantity` int(11) NOT NULL,
  `TotalPrice` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `ReviewID` int(11) NOT NULL,
  `Star` int(11) NOT NULL,
  `Comment` text NOT NULL,
  `ProductID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(100) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`RoleID`, `RoleName`, `Description`) VALUES
(1, 'Admin', 'The person who has highest permission'),
(2, 'Saler', 'The person who confirmed order and packed them'),
(3, 'Shipper', 'The person who delivered order');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `CustomerID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`BrandID`),
  ADD KEY `CateID` (`CateID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`CouponID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustomerID`),
  ADD KEY `RoleID` (`RankID`);

--
-- Indexes for table `customercoupon`
--
ALTER TABLE `customercoupon`
  ADD PRIMARY KEY (`CustomerD`,`CouponID`) USING BTREE,
  ADD KEY `CouponID` (`CouponID`),
  ADD KEY `UserID` (`CustomerD`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`DiscountID`);

--
-- Indexes for table `discountdetail`
--
ALTER TABLE `discountdetail`
  ADD PRIMARY KEY (`DiscountID`,`ProductID`) USING BTREE,
  ADD KEY `DiscountID` (`DiscountID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`EmployeeID`),
  ADD KEY `RoleID` (`RoleID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `UserID` (`CustomerID`),
  ADD KEY `StatusID` (`StatusID`),
  ADD KEY `EmployeeID` (`EmployeeID`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`OrderID`,`ProductID`) USING BTREE,
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `OrderID` (`OrderID`);

--
-- Indexes for table `orderstatus`
--
ALTER TABLE `orderstatus`
  ADD PRIMARY KEY (`StatusID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `CateID` (`CateID`),
  ADD KEY `BrandID` (`BrandID`);

--
-- Indexes for table `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `rank`
--
ALTER TABLE `rank`
  ADD PRIMARY KEY (`RankID`);

--
-- Indexes for table `receivedetail`
--
ALTER TABLE `receivedetail`
  ADD PRIMARY KEY (`ReceiveID`,`ProductID`) USING BTREE,
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `ReceiveID` (`ReceiveID`);

--
-- Indexes for table `receivenote`
--
ALTER TABLE `receivenote`
  ADD PRIMARY KEY (`ReceiveID`),
  ADD KEY `CustomerID` (`EmployeeID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ReviewID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`RoleID`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`CustomerID`,`ProductID`) USING BTREE,
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `UserID` (`CustomerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `BrandID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `CouponID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `DiscountID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderstatus`
--
ALTER TABLE `orderstatus`
  MODIFY `StatusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rank`
--
ALTER TABLE `rank`
  MODIFY `RankID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receivenote`
--
ALTER TABLE `receivenote`
  MODIFY `ReceiveID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `RoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`CateID`) REFERENCES `category` (`CategoryID`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`RankID`) REFERENCES `rank` (`RankID`);

--
-- Constraints for table `customercoupon`
--
ALTER TABLE `customercoupon`
  ADD CONSTRAINT `customercoupon_ibfk_1` FOREIGN KEY (`CouponID`) REFERENCES `coupon` (`CouponID`),
  ADD CONSTRAINT `customercoupon_ibfk_2` FOREIGN KEY (`CustomerD`) REFERENCES `customer` (`CustomerID`);

--
-- Constraints for table `discountdetail`
--
ALTER TABLE `discountdetail`
  ADD CONSTRAINT `discountdetail_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  ADD CONSTRAINT `discountdetail_ibfk_2` FOREIGN KEY (`DiscountID`) REFERENCES `discount` (`DiscountID`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`StatusID`) REFERENCES `orderstatus` (`StatusID`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`),
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`);

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CateID`) REFERENCES `category` (`CategoryID`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`BrandID`) REFERENCES `brand` (`BrandID`);

--
-- Constraints for table `receivedetail`
--
ALTER TABLE `receivedetail`
  ADD CONSTRAINT `receivedetail_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  ADD CONSTRAINT `receivedetail_ibfk_2` FOREIGN KEY (`ReceiveID`) REFERENCES `receivenote` (`ReceiveID`);

--
-- Constraints for table `receivenote`
--
ALTER TABLE `receivenote`
  ADD CONSTRAINT `receivenote_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
