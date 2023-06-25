-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 25, 2023 at 11:47 AM
-- Server version: 11.0.2-MariaDB-1:11.0.2+maria~ubu2204
-- PHP Version: 8.1.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attic`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessmentItem`
--

CREATE TABLE `assessmentItem` (
  `course_id` int(11) NOT NULL,
  `assessment_id` int(11) NOT NULL,
  `assessment_type` int(11) NOT NULL,
  `assessment_title` text NOT NULL,
  `assessment_description` text NOT NULL,
  `assessment_semester` int(1) NOT NULL,
  `assessment_year` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessmentItem`
--

INSERT INTO `assessmentItem` (`course_id`, `assessment_id`, `assessment_type`, `assessment_title`, `assessment_description`, `assessment_semester`, `assessment_year`) VALUES
(1, 1, 1, 'Final Exam', '', 1, 2021);

-- --------------------------------------------------------

--
-- Table structure for table `assessmentQuestion`
--

CREATE TABLE `assessmentQuestion` (
  `assessment` int(11) NOT NULL,
  `questionIdentifier` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `questionSection` varchar(4) NOT NULL,
  `questionNumber` varchar(4) NOT NULL,
  `questionMarks` int(2) NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessmentQuestion`
--

INSERT INTO `assessmentQuestion` (`assessment`, `questionIdentifier`, `user`, `questionSection`, `questionNumber`, `questionMarks`, `question`) VALUES
(1, 1, 1, '1', 'a', 6, 'Three different types of software development organisations were identified in lectures. These\r\nwere internal information technology departments, professional services / consulting companies,\r\nand research and development / product development companies. Identify a process model that\r\nwould be suitable for each type of software development organisation. Explain why the process\r\nmodel would be suitable based on the characteristics of the type of development undertaken by\r\nthat type of organisation.'),
(1, 2, 1, '1', 'b', 6, 'Would formal Fagan inspections be an appropriate verification technique to use in a team following eXtreme Programming? Justify your answer. Identify two characteristics of Fagan\r\ninspections and explain why these make it suitable (or unsuitable) to apply in eXtreme Programming? (Your answer to this last part of the question will depend on your answer to the\r\nfirst part of the question.)'),
(1, 3, 1, '2', 'a', 6, 'asdasdasd');

-- --------------------------------------------------------

--
-- Table structure for table `assessmentResponse`
--

CREATE TABLE `assessmentResponse` (
  `user` int(11) NOT NULL,
  `assessmentItem` int(11) NOT NULL,
  `assessmentResponse` int(11) NOT NULL,
  `assessmentQuestion` int(11) NOT NULL,
  `response` text NOT NULL,
  `respondingTo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessmentResponse`
--

INSERT INTO `assessmentResponse` (`user`, `assessmentItem`, `assessmentResponse`, `assessmentQuestion`, `response`, `respondingTo`) VALUES
(1, 1, 1, 1, 'testasdasdasd', NULL),
(1, 1, 2, 1, 'axsdasdasdasd', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(11) NOT NULL,
  `course_title` text NOT NULL,
  `course_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `course_title`, `course_description`) VALUES
(1, 'CSSE3012', 'The Software Process', 'Software lifecycle as an industrial process, definable, manageable & repeatable. Requirements engineering, object-oriented analysis. Software requirements specification, prototyping, verification & validation, configuration management, maintenance. Software quality, process standards, process improvement. Software engineering tools.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `image` text NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user`, `name`, `nickname`, `image`, `time`) VALUES
(1, 'Tristan', 'Tristan', 'https://foto.kontan.co.id/qltbMW-K_RmLBxgHh0VKZemVeCY=/smart/2023/05/03/889096488p.jpg', '2023-06-23 09:45:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessmentItem`
--
ALTER TABLE `assessmentItem`
  ADD PRIMARY KEY (`assessment_id`);

--
-- Indexes for table `assessmentQuestion`
--
ALTER TABLE `assessmentQuestion`
  ADD PRIMARY KEY (`questionIdentifier`);

--
-- Indexes for table `assessmentResponse`
--
ALTER TABLE `assessmentResponse`
  ADD PRIMARY KEY (`assessmentResponse`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessmentItem`
--
ALTER TABLE `assessmentItem`
  MODIFY `assessment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assessmentQuestion`
--
ALTER TABLE `assessmentQuestion`
  MODIFY `questionIdentifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `assessmentResponse`
--
ALTER TABLE `assessmentResponse`
  MODIFY `assessmentResponse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
