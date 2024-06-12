-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2024 at 08:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `bank_details` varchar(255) DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `customer_type` varchar(50) DEFAULT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `mobile`, `picture`, `bank_details`, `passport`, `facebook_id`, `date_of_birth`, `address`, `customer_type`, `sex`, `status`, `created_at`) VALUES
(17, 'Koushik', '', 'koushik@gmail.com', '0929862971', 'uploads\\istockphoto-1386217759-612x612.jpg', 'sasd', 'dadadsdadad', 'dasds', '2024-04-11', 'africa 2 ', 'VIP', '', 'Active', '2024-04-05 07:14:53'),
(25, 'Jayanta', 'ad', 'user@gmail.com', '2098716479', 'uploads\\WhatsApp Image 2024-03-12 at 15.04.54_069f47d1.jpg', 'xsZZx', 'asfasfkj', 'ayan', '2024-05-10', 'not succes', 'regular', '', '', '2024-04-05 09:07:34'),
(26, 'Subhajit', 'chowdhury', 'subha@gmail.com', '912089662', 'uploads\\Screenshot 2024-04-09 161343.png', NULL, NULL, NULL, NULL, 'kolkata', 'vendor', NULL, 'Active', '2024-04-15 18:38:22');

-- --------------------------------------------------------

--
-- Table structure for table `deposits`
--

CREATE TABLE `deposits` (
  `id` int(11) NOT NULL,
  `account` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `deposits`
--

INSERT INTO `deposits` (`id`, `account`, `date`, `description`, `amount`) VALUES
(1, '2142343422', '2024-04-02', 'Searching a vendor', 15938.00),
(26, 'Datchbangla Bank', '2024-04-06', 'nothing', 233.00),
(30, 'Exim Bank', '2024-04-07', 'sadsa', 231.00),
(31, 'Sonali Bank', '2024-04-02', 'qqww', 123.00),
(32, 'Brac Bank', '2024-04-05', 'nothing 2', 12.00),
(35, 'Exim Bank', '2024-04-01', 'Update 2', 10000.00),
(36, 'Sonali Bank', '2024-04-09', 'Searching Vendor', 12000.00),
(37, 'Bank of Asia', '2024-04-25', 'Fixed deposite', 20100.00);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `invoiceNo` varchar(255) NOT NULL,
  `invoiceDate` date NOT NULL,
  `refNo` varchar(255) DEFAULT NULL,
  `refDate` date DEFAULT NULL,
  `reverseCharge` varchar(255) DEFAULT NULL,
  `billType` varchar(255) DEFAULT NULL,
  `placeOfSupply` varchar(255) DEFAULT NULL,
  `paymentTerm` varchar(255) DEFAULT NULL,
  `pdcDueDate` date DEFAULT NULL,
  `customerName` varchar(255) NOT NULL,
  `billingAddress` varchar(255) NOT NULL,
  `shippingAddress` varchar(255) NOT NULL,
  `gstin` varchar(255) NOT NULL,
  `stateCode` varchar(255) NOT NULL,
  `contactPerson` varchar(255) NOT NULL,
  `itemCode` int(11) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `uom` varchar(255) NOT NULL,
  `itemRate` decimal(10,2) NOT NULL,
  `taxPercentage` int(11) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `pinCode` varchar(10) NOT NULL,
  `hsnSacNumber` varchar(255) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `ifscCode` varchar(11) NOT NULL,
  `accountNumber` varchar(20) NOT NULL,
  `micrNumber` varchar(20) NOT NULL,
  `bankDetails` text NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoiceNo`, `invoiceDate`, `refNo`, `refDate`, `reverseCharge`, `billType`, `placeOfSupply`, `paymentTerm`, `pdcDueDate`, `customerName`, `billingAddress`, `shippingAddress`, `gstin`, `stateCode`, `contactPerson`, `itemCode`, `itemName`, `quantity`, `uom`, `itemRate`, `taxPercentage`, `discount`, `total`, `pinCode`, `hsnSacNumber`, `bankName`, `ifscCode`, `accountNumber`, `micrNumber`, `bankDetails`, `state`, `status`) VALUES
(1, '2973NDB', '2024-04-10', '23231', '2024-04-12', '12123', 'damn', 'Durgapur', 'Credit crad', '2024-04-09', 'ALPHA Private Limited', 'adsad', 'sadkjbads,', 'GRMDS12200099NN', '', 'Pallab', 878764, 'SASS', 765, 'IEYUI', 765.00, 28, 34.00, 33245.00, '7013204', '7673768', 'sbi', 'jbhhzajhy', '13313131', '13131', 'SBI', 'West Bengal', 'Active'),
(2, '2973NSB', '2024-03-31', '12122', '2024-04-05', '12123', 'sub ordinary', 'Durgapur', 'Credit crad', '2024-04-11', 'TCS', 'adads', 'kolkata', 'TAS1112', '', 'Pallab', 21123, 'SASS', 0, 'IEYUI', 1999.00, 18, 2000.00, 1010101.00, '700124', '227188NAVD', 'SBI', 'SBIN2321231', '9889216872', '321321NB', 'STATE BANK OF INDIA', 'Uttar Pradesh', 'Inactive'),
(4, '2973NSB', '2024-04-02', 'sad', '2024-04-16', '9200', 'sub ordinary', 'Durgapur', 'Credit crad', '2024-04-14', 'TCS', 'da', 'adads', 'TAS1112', '', 'Pallabwdsq', 2121, '21121', 2, '22', 221.00, 12, 211.00, 21212.00, '2098176', '227188NAVD', 'SBI', '213123NSBI', '131313289784', '13131', '12', 'Ladakh', 'Active'),
(5, 'NEW213', '2024-04-13', 'not@#', '2024-04-15', '12123', 'Sass', 'Durgapur', 'Debit', '2024-04-12', 'SUJAN', 'Dubai', 'Dubai 23', 'GRMDS12200099NN', '', 'AYAN', 3231, 'TEST', 120, 'IEYUI', 400.00, 18, 0.00, 39360.00, '700124', '227188NAVD', 'barasat', 'SBIN2321231', '9889216872', '321321NB', 'TEST', 'Ladakh', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `quote_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `quote_id`, `name`, `description`, `quantity`, `unit_price`, `total`, `discount`, `tax`) VALUES
(1, 1, 'ERP System', 'Not Wroking', 21, 200.00, 4536.00, 10.00, 18.00),
(2, 2, 'adwsda', 'diuadla', 10, 245.00, 2523.50, 15.00, 18.00),
(3, 2, 'hrms', 'jdaks', 25, 199.00, 5124.25, 15.00, 18.00),
(4, 4, 'nothing', 'NOT ', 11, 100.00, 1298.00, 0.00, 18.00),
(5, 5, 'jsah', 'asdjsbj', 12, 12.00, 318.24, 0.00, 121.00),
(7, 7, 'abr esechis 2', 'keno eli', 100, 1000.00, 68000.00, 50.00, 18.00),
(10, 10, 'wariko', 'youtube channel', 34, 97.00, 3561.84, 10.00, 18.00);

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `quote_id` int(11) NOT NULL,
  `quote_number` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `quote_date` date NOT NULL,
  `validity_period` date NOT NULL,
  `agreed_to_terms` tinyint(1) NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`quote_id`, `quote_number`, `customer_name`, `customer_email`, `quote_date`, `validity_period`, `agreed_to_terms`, `notes`) VALUES
(1, 'MASK 000', 'EFS', 'efs@gmail.com', '2024-04-11', '2024-05-03', 1, 'nothing'),
(2, 'fidnsn2', 'sff', 'af@gmail.com', '2024-04-18', '2024-05-08', 1, 'nothing'),
(4, 'PEO12', 'TCS', 'tcs@gmail.com', '2024-04-18', '2024-05-02', 1, 'ALpha '),
(5, 'NO4', 'MAT', 'mati@gmail.com', '2024-04-18', '2024-04-18', 1, 'noooookca  c xca xc akj cljacl A cabkjcxbkjavckjvkjavcka'),
(7, 'QIS 4', 'Abr esechis ', 'abr@gmail.com', '2024-05-10', '2024-05-24', 1, 'jaa pala'),
(10, '7878AFRR', 'numbere', 'nm@gmail.com', '2024-04-26', '2024-04-15', 1, 'nothing');

-- --------------------------------------------------------

--
-- Table structure for table `recurringinvoices`
--

CREATE TABLE `recurringinvoices` (
  `id` int(11) NOT NULL,
  `referenceNo` varchar(255) DEFAULT NULL,
  `recurringEvery` enum('hour','day','week','month','yearly') DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `client` varchar(255) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `recurringinvoices`
--

INSERT INTO `recurringinvoices` (`id`, `referenceNo`, `recurringEvery`, `quantity`, `rate`, `tax`, `department`, `startDate`, `endDate`, `client`, `total`, `notes`) VALUES
(4, '8276NSH', 'hour', 2039, 200.00, 12.00, 'Technology', '2024-04-14', '2024-05-10', 'TATA', 28774.00, 'Nothing'),
(5, 'KAID82', 'hour', 40, 200.00, 18.00, 'HR', '2024-04-17', '2024-04-28', 'OWN', 9440.00, 'nothing');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `quote_id` (`quote_id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`quote_id`);

--
-- Indexes for table `recurringinvoices`
--
ALTER TABLE `recurringinvoices`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `deposits`
--
ALTER TABLE `deposits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `quote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `recurringinvoices`
--
ALTER TABLE `recurringinvoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`quote_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
