-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Apr 2023 pada 02.52
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

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
-- Struktur dari tabel `activity`
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
-- Struktur dari tabel `bahan_baku`
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
-- Dumping data untuk tabel `bahan_baku`
--

INSERT INTO `bahan_baku` (`id`, `nama_bahan`, `no_part`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'Kuvkal', '1234', 23456, '2023-03-05 04:47:41', '2023-03-05 04:47:41'),
(2, 'Bahan 1', '1234', 123, '2023-03-05 06:33:53', '2023-03-05 06:33:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bahan_baku_transaksi`
--

CREATE TABLE `bahan_baku_transaksi` (
  `id` bigint(20) NOT NULL,
  `no_surat` varchar(255) DEFAULT NULL,
  `kode_transaksi` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `bulan` varchar(255) DEFAULT NULL,
  `nama_bahan` varchar(255) DEFAULT NULL,
  `id_bahan` varchar(255) DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `capaian_delivery`
--

CREATE TABLE `capaian_delivery` (
  `id` int(11) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `bulan` date DEFAULT NULL,
  `produk` text DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `plan_delivery` text DEFAULT NULL,
  `pengiriman` int(11) DEFAULT NULL,
  `capaian` varchar(255) DEFAULT NULL,
  `presentase` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `capaian_produksi`
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
-- Struktur dari tabel `pa_schedule`
--

CREATE TABLE `pa_schedule` (
  `id` bigint(20) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `bulan` varchar(255) DEFAULT NULL,
  `produk` varchar(255) DEFAULT NULL,
  `no_part` varchar(255) DEFAULT NULL,
  `plan_produksi` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `pa_schedule`
--

INSERT INTO `pa_schedule` (`id`, `tanggal`, `bulan`, `produk`, `no_part`, `plan_produksi`, `created_at`, `updated_at`) VALUES
(1, '2023-04-06', 'Januari', 'UNDER BRACKET', '1234', 123, '2023-04-06 14:07:11', '2023-04-06 14:07:11'),
(2, '1987-10-10', 'Februari', 'UNDER BRACKET', '234xx', 0, '2023-04-07 03:44:03', '2023-04-07 03:44:03'),
(3, '2023-04-06', 'Januari', 'UNDER BRACKET', '12345', 123, '2023-04-06 14:07:11', '2023-04-06 14:07:11'),
(4, '2023-04-09', 'Februari', 'UNDER BRACKET', '123456', 123, '2023-04-06 14:07:11', '2023-04-06 14:07:11'),
(5, '2023-04-09', 'Februari', 'UNDER BRACKET', '1234567', 123, '2023-04-06 14:07:11', '2023-04-06 14:07:11'),
(6, '2023-04-09', 'Januari', 'INNER TUBE', '12345678', 123, '2023-04-06 14:07:11', '2023-04-06 14:07:11'),
(7, '2023-04-09', 'Januari', 'INNER TUBE', '123456', 123, '2023-04-06 14:07:11', '2023-04-06 14:07:11'),
(8, '2023-04-09', 'Februari', 'INNER TUBE', '1234567', 123, '2023-04-06 14:07:11', '2023-04-06 14:07:11'),
(9, '2023-04-09', 'Maret', 'INNER TUBE', '12345678', 1234, '2023-04-06 14:07:11', '2023-04-06 14:07:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk_jadi`
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
-- Dumping data untuk tabel `produk_jadi`
--

INSERT INTO `produk_jadi` (`id`, `nama_produk`, `no_part`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'Kuvkal', '1234', 23456, '2023-03-05 06:23:34', '2023-03-05 06:23:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk_jadi_transaksi`
--

CREATE TABLE `produk_jadi_transaksi` (
  `id` int(11) NOT NULL,
  `no_surat` varchar(255) DEFAULT NULL,
  `kode_transaksi` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `bulan` varchar(255) DEFAULT NULL,
  `nama_produk` varchar(255) DEFAULT NULL,
  `id_produk` varchar(255) NOT NULL,
  `no_part` varchar(255) NOT NULL,
  `stok` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `projek`
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
-- Struktur dari tabel `quality`
--

CREATE TABLE `quality` (
  `id` int(11) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `bulan` int(11) DEFAULT NULL,
  `shift` varchar(255) DEFAULT NULL,
  `produk` text DEFAULT NULL,
  `no_part` text DEFAULT NULL,
  `hasil_produksi` text DEFAULT NULL,
  `jenis_kecacatan` text DEFAULT NULL,
  `kuantitas` varchar(255) DEFAULT NULL,
  `persentase_ng` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `quality`
--

INSERT INTO `quality` (`id`, `tanggal`, `bulan`, `shift`, `produk`, `no_part`, `hasil_produksi`, `jenis_kecacatan`, `kuantitas`, `persentase_ng`, `created_at`, `updated_at`) VALUES
(1, '1999-10-10', NULL, '1', 'UNDER BRACKET', '123-456-789', 'Hardware', 'Rusak Parah', '2', NULL, '2023-04-09 16:28:02', '2023-04-09 16:28:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule_detail`
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

--
-- Dumping data untuk tabel `schedule_detail`
--

INSERT INTO `schedule_detail` (`id`, `tanggal`, `produk`, `no_part`, `plan_produksi`, `created_at`, `updated_at`) VALUES
(1, '2022-10-10', 'F1 Minardi', '1234', 0, '2023-04-06 22:06:00', '2023-04-06 22:06:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `usecase`
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
-- Struktur dari tabel `users`
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
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `is_sales`, `is_ppic`, `is_produksi`, `is_store`, `is_manajerial`, `posisi`, `create_at`, `updated_at`) VALUES
(1, 'firja10', 'fairuzfirjatullah3@gmail.com', 'Shikamaru2209', 1, NULL, NULL, NULL, NULL, 'sales', '2023-03-05 04:38:54', '2023-03-05 04:38:54'),
(2, 'Raja', 'dte07111840000121@gmail.com', 'Shikamaru2209', NULL, NULL, NULL, NULL, NULL, 'ppc', '2023-03-05 06:24:12', '2023-03-05 06:24:12'),
(3, 'storeadmin', 'fairuzf1010@gmail.com', 'Shikamaru2209', NULL, NULL, NULL, NULL, NULL, 'store', '2023-03-05 06:35:57', '2023-03-05 06:35:57'),
(4, 'manajemen', 'fairuzf1010@gmail.com', 'Shikamaru2209', NULL, NULL, NULL, NULL, NULL, 'manajerial', '2023-03-05 07:00:06', '2023-03-05 07:00:06'),
(5, 'damonhill', 'damonhill@gmail.com', 'Shikamaru2209', NULL, NULL, NULL, NULL, NULL, 'produksi', '2023-04-06 02:45:42', '2023-04-06 02:45:42');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `bahan_baku`
--
ALTER TABLE `bahan_baku`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `bahan_baku_transaksi`
--
ALTER TABLE `bahan_baku_transaksi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `capaian_delivery`
--
ALTER TABLE `capaian_delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `capaian_produksi`
--
ALTER TABLE `capaian_produksi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pa_schedule`
--
ALTER TABLE `pa_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `produk_jadi`
--
ALTER TABLE `produk_jadi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `produk_jadi_transaksi`
--
ALTER TABLE `produk_jadi_transaksi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `projek`
--
ALTER TABLE `projek`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `quality`
--
ALTER TABLE `quality`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `schedule_detail`
--
ALTER TABLE `schedule_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `usecase`
--
ALTER TABLE `usecase`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `activity`
--
ALTER TABLE `activity`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `bahan_baku`
--
ALTER TABLE `bahan_baku`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `bahan_baku_transaksi`
--
ALTER TABLE `bahan_baku_transaksi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `capaian_delivery`
--
ALTER TABLE `capaian_delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `capaian_produksi`
--
ALTER TABLE `capaian_produksi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pa_schedule`
--
ALTER TABLE `pa_schedule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `produk_jadi`
--
ALTER TABLE `produk_jadi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `produk_jadi_transaksi`
--
ALTER TABLE `produk_jadi_transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `projek`
--
ALTER TABLE `projek`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `quality`
--
ALTER TABLE `quality`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `schedule_detail`
--
ALTER TABLE `schedule_detail`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `usecase`
--
ALTER TABLE `usecase`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
