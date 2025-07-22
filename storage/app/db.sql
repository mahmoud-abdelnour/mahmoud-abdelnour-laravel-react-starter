-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 08, 2025 at 07:56 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




---
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `active`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@domain.com', '3424234234242111', 1, NULL, '$2y$10$MxerDJCKv3Jr4/ID1m3VgeBZlUTdcFjUty2Lkk.z5SEzzug/jQR5O', NULL, '2025-03-17 04:14:12', '2025-06-30 13:22:03');




INSERT INTO `permissions` (`id`, `name`, `display_name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'manage_users', 'Manage Users', 'web', '2025-03-24 07:46:14', '2025-03-24 07:51:34'),
(3, 'manage_products', 'Manage Products', 'web', '2025-03-25 03:04:29', '2025-03-25 03:04:29'),
(5, 'manage_roles', 'Manage Roles', 'web', '2025-03-25 10:48:46', '2025-03-25 10:48:46'),
(6, 'manage_product_categories', 'Manage Product Category', 'web', NULL, NULL),
(7, 'manage_dashboard', 'Manage Dashboard', 'web', NULL, NULL),
(8, 'manage_profile', 'Manage Profile', 'web', NULL, NULL),
(9, 'manage_settings', 'Manage Settings', 'web', NULL, NULL);



INSERT INTO `roles` (`id`, `name`, `display_name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'administrator', 'web', '2025-03-20 06:55:02', '2025-04-07 03:49:55'),
(2, 'moderator', 'moderator ', 'web', '2025-03-20 06:44:56', '2025-04-10 12:44:04');



INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(3, 1),
(5, 1),
(6, 1),
(7, 1),
(1, 2),
(5, 2),
(7, 2),
(8, 2),
(9, 2);


INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1);




INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'RZreALpWhzvoIXyW3trjvpO6qZxJeQwOsjxZddvk', NULL, 'http://localhost', 1, 0, 0, '2025-03-17 04:51:59', '2025-03-17 04:51:59'),
(2, NULL, 'Laravel Password Grant Client', 'vFdN8zzDUxCm6iNSNdrRKrdw2lyX9RlAuAPMXmUe', 'users', 'http://localhost', 0, 1, 0, '2025-03-17 04:51:59', '2025-03-17 04:51:59');



INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-03-17 04:51:59', '2025-03-17 04:51:59');


COMMIT;
