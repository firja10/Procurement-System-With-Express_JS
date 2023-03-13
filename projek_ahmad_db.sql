-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2023 at 01:51 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projek_ahmad_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_activity` varchar(255) DEFAULT NULL,
  `desc_activity` varchar(255) DEFAULT NULL,
  `tanggal_awal` date DEFAULT NULL,
  `tanggal_akhir` date DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bahan_baku`
--

CREATE TABLE `bahan_baku` (
  `id` bigint(20) NOT NULL,
  `nama_bahan` varchar(255) DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `bahan_baku`
--

INSERT INTO `bahan_baku` (`id`, `nama_bahan`, `no_part`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'Kuvkal', '1234', 23456, '2023-03-05 04:47:41', '2023-03-05 04:47:41'),
(2, 'Bahan 1', '1234', 123, '2023-03-05 06:33:53', '2023-03-05 06:33:53');

-- --------------------------------------------------------

--
-- Table structure for table `bahan_baku_transaksi`
--

CREATE TABLE `bahan_baku_transaksi` (
  `id` bigint(20) NOT NULL,
  `no_surat` varchar(255) DEFAULT NULL,
  `kode_transaksi` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `nama_bahan` varchar(255) DEFAULT NULL,
  `id_bahan` varchar(255) DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `capaian_produksi`
--

CREATE TABLE `capaian_produksi` (
  `id` bigint(20) NOT NULL,
  `produk` varchar(255) DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `plan_produksi` int(11) DEFAULT NULL,
  `hasil_produksi` int(11) DEFAULT NULL,
  `sisa_produksi` int(11) DEFAULT NULL,
  `capaian_produksi` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pa_schedule`
--

CREATE TABLE `pa_schedule` (
  `id` bigint(20) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `produk` varchar(255) DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `plan_produksi` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk_jadi`
--

CREATE TABLE `produk_jadi` (
  `id` bigint(20) NOT NULL,
  `nama_produk` varchar(255) DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `produk_jadi`
--

INSERT INTO `produk_jadi` (`id`, `nama_produk`, `no_part`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'Kuvkal', '1234', 23456, '2023-03-05 06:23:34', '2023-03-05 06:23:34');

-- --------------------------------------------------------

--
-- Table structure for table `projek`
--

CREATE TABLE `projek` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_projek` varchar(255) DEFAULT NULL,
  `tanggal_awal` date DEFAULT NULL,
  `tanggal_akhir` date DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule_detail`
--

CREATE TABLE `schedule_detail` (
  `id` bigint(20) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `produk` varchar(255) DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `plan_produksi` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usecase`
--

CREATE TABLE `usecase` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_usecase` varchar(255) DEFAULT NULL,
  `desc_usecase` varchar(255) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_sales` int(11) DEFAULT NULL,
  `is_ppic` int(11) DEFAULT NULL,
  `is_produksi` int(11) DEFAULT NULL,
  `is_store` int(11) DEFAULT NULL,
  `is_manajerial` int(11) DEFAULT NULL,
  `posisi` varchar(255) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `is_sales`, `is_ppic`, `is_produksi`, `is_store`, `is_manajerial`, `posisi`, `create_at`, `updated_at`) VALUES
(1, 'firja10', 'fairuzfirjatullah3@gmail.com', 'Shikamaru2209', 1, NULL, NULL, NULL, NULL, 'sales', '2023-03-05 04:38:54', '2023-03-05 04:38:54'),
(2, 'Raja', 'dte07111840000121@gmail.com', 'Shikamaru2209', NULL, NULL, NULL, NULL, NULL, 'ppic', '2023-03-05 06:24:12', '2023-03-05 06:24:12'),
(3, 'storeadmin', 'fairuzf1010@gmail.com', 'Shikamaru2209', NULL, NULL, NULL, NULL, NULL, 'store', '2023-03-05 06:35:57', '2023-03-05 06:35:57'),
(4, 'manajemen', 'fairuzf1010@gmail.com', 'Shikamaru2209', NULL, NULL, NULL, NULL, NULL, 'manajerial', '2023-03-05 07:00:06', '2023-03-05 07:00:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bahan_baku`
--
ALTER TABLE `bahan_baku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bahan_baku_transaksi`
--
ALTER TABLE `bahan_baku_transaksi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `capaian_produksi`
--
ALTER TABLE `capaian_produksi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pa_schedule`
--
ALTER TABLE `pa_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produk_jadi`
--
ALTER TABLE `produk_jadi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projek`
--
ALTER TABLE `projek`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule_detail`
--
ALTER TABLE `schedule_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usecase`
--
ALTER TABLE `usecase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bahan_baku`
--
ALTER TABLE `bahan_baku`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bahan_baku_transaksi`
--
ALTER TABLE `bahan_baku_transaksi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `capaian_produksi`
--
ALTER TABLE `capaian_produksi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pa_schedule`
--
ALTER TABLE `pa_schedule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk_jadi`
--
ALTER TABLE `produk_jadi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projek`
--
ALTER TABLE `projek`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule_detail`
--
ALTER TABLE `schedule_detail`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usecase`
--
ALTER TABLE `usecase`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
