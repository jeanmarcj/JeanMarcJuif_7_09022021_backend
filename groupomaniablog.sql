-- phpMyAdmin SQL Dump
-- version 4.9.6
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 02 sep. 2021 à 16:05
-- Version du serveur :  10.3.27-MariaDB
-- Version de PHP : 7.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniablog`
--

-- --------------------------------------------------------

--
-- Structure de la table `postComments`
--

CREATE TABLE `postComments` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `postComments`
--

INSERT INTO `postComments` (`id`, `content`, `published`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(33, 'Dangeureux ces orages ', 1, '2021-09-02 11:45:10', '2021-09-02 11:45:10', 39, 39),
(34, 'Les prix augmentent toujours. Quand vont-ils diminuer ?', 1, '2021-09-02 11:56:46', '2021-09-02 11:56:46', 40, 40),
(35, 'Une tempête de plus sur New-york', 1, '2021-09-02 11:57:34', '2021-09-02 11:57:34', 40, 39),
(38, 'Je vais mettre une alerte à la baisse des prix !', 1, '2021-09-02 13:33:24', '2021-09-02 13:33:24', 38, 40),
(39, 'Les joueurs sont-ils mouillés ?', 1, '2021-09-02 13:34:24', '2021-09-02 13:34:24', 38, 39),
(40, 'Moi je n\'ai pas suivi...', 1, '2021-09-02 13:36:30', '2021-09-02 13:36:30', 39, 48);

-- --------------------------------------------------------

--
-- Structure de la table `postLikes`
--

CREATE TABLE `postLikes` (
  `id` int(11) NOT NULL,
  `isLiked` tinyint(1) NOT NULL DEFAULT 0,
  `isDisliked` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `authorId` int(11) NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `media` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `publishedAT` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `authorId`, `title`, `media`, `content`, `slug`, `published`, `publishedAT`, `createdAt`, `updatedAt`, `userId`) VALUES
(39, 38, 'US Open : les images impressionnantes du déluge sur les courts à New York', 'http://localhost:3000/images/1630582542656-jmj-spices-370114_1280.jpg', 'La tempête s\'est invitée sur New York et a perturbé la programmation nocturne de l\'US Open. En dépit du toit, la pluie peut, poussée par le vent, s\'inviter sur le court Louis Armstrong en passant par les ouvertures latérales. Les organisateurs ont été contraints d\'interrompre le match entre Diego Schwartzman (n°11) et Kevin Anderson et de le déplacer sur le court Arthur Ashe à l\'issue de la rencontre entre Tsitsipas et Mannarino. Un peu avant minuit à New York (avant 6h du matin à Paris). L\'Argentin menait 7-6 (7/4). Le 2e set venait de débuter, Anderson menait 30-15. Les images montraient à l\'extérieur du stade des vagues de pluie, nées d\'une tornade à moins de 20 km du site, vestige de l\'ouragan meurtrier Ida. Loin du stade, la ville a été frappée par la tempête. La gouverneure de l\'État de New York a déclaré l\'état d\'urgence. L\'Argentin résistant finalement 7-6, 6-3, 6-4 aux services (24 aces) du Sud-Africain pour boucler victorieusement ce match en plusieurs temps. Au 3e tour, il sera opposé au Slovaque Alex Molcan (138e mondial).', 'USOpenImages', 1, '2021-09-02 11:35:45', '2021-09-02 11:35:45', '2021-09-02 11:35:45', 38),
(40, 39, 'Les prix alimentaires mondiaux sont repartis à la hausse en août', 'http://localhost:3000/images/1630583184719-jmj-safran-3288215_1280.jpg', 'Les prix mondiaux des produits alimentaires ont rebondi en août après deux mois consécutifs de baisse, tirés par la forte hausse des cours du sucre, du blé et des huiles végétales, a annoncé jeudi l\'Organisation des Nations Unies pour l\'alimentation et l\'agriculture (FAO).', 'PrixAlimentaires', 1, '2021-09-02 11:46:26', '2021-09-02 11:46:26', '2021-09-02 11:46:26', 39),
(48, 38, 'L\'Euro 2021 a été suivi par 5,2 milliards de téléspectateurs', 'http://localhost:3000/images/1630589557477-jmj-apple-691282_1280.jpg', 'Selon l\'UEFA, l\'Euro 2021, qui a vu l\'Italie s\'imposer en finale à Wembley face à l\'Angleterre, est l\'un des «événements les plus regardés de l\'histoire» avec pas moins de 5,2 milliards de téléspectateurs sur l\'ensemble de la compétition (dont 328 millions pendant la finale). Diffusé dans près de 229 territoires, le succès planétaire n\'est plus à prouver, le football s\'affirme encore et toujours comme le sport numéro un au monde.', 'euro2021', 1, '2021-09-02 13:32:37', '2021-09-02 13:32:37', '2021-09-02 13:32:37', 38),
(49, 39, 'A 50 ans Pierre Fairbank décroche le bronze sur 800m fauteuil', 'http://localhost:3000/images/1630589750685-jmj-apple-1834328_1280.jpg', 'Il n\'est jamais trop tard pour briller, Pierre Fairbank l\'a bien compris. Pour sa dernière course, le Français de 50 ans a glané ce jeudi la médaille de bronze sur 800m fauteuil (T53), la première pour lui lors de cette éditon mais la 9e de toute sa carrière. Avec un chrono de 1\'39\'\'67, le Néo-Calédonien n\'a été devancé que par le Thaïlandais Pongsakorn Paeyo (1\'36\'\'07) et le Canadien Brent Lakatos (1\'36\'\'32). Celui qui a débuté sa carrière à 15 ans complète ainsi son joli palmarès et met un terme à sa carrière unique de la meilleure des manières.', 'pierrefairbank', 1, '2021-09-02 13:35:50', '2021-09-02 13:35:50', '2021-09-02 13:35:50', 39),
(50, 39, 'Hervé Mathoux invite Pierre Ménès à «se remettre en cause»', 'http://localhost:3000/images/1630590227728-jmj-apple-691282_1280.jpg', 'La belle entente passée au sein de l\'ancien duo du Canal Football Club vole en éclats. Vivement critiqué par Pierre Ménès pour le manque de soutien à son égard, suite à la diffusion du documentaire «Je ne suis pas une salope, je suis une journaliste» de Marie Portolano (qui a entrainé sa mise à l\'écart des antennes du groupe Canal), Hervé Mathoux a tenu à clarifier la situation. La suite...', 'hervemathoux', 1, '2021-09-02 13:43:47', '2021-09-02 13:43:47', '2021-09-02 13:46:31', 39);

-- --------------------------------------------------------

--
-- Structure de la table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `isReported` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registeredAT` datetime NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `isOnline` tinyint(1) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `passwordPlainText` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `passwordHash`, `avatar`, `registeredAT`, `isAdmin`, `isOnline`, `isActive`, `createdAt`, `updatedAt`, `passwordPlainText`) VALUES
(38, 'Maximilien', 'Durand', 'mjbup@gmail.com', '$2b$10$ooFjrk3kf6uIk3pHUS3L0.DMV3b6EsGnN0ArMabyccIy7DQhaFVC2', NULL, '2021-08-30 10:33:29', 1, 1, 1, '2021-08-30 10:33:29', '2021-08-30 10:33:29', ''),
(39, 'Isabelle', 'Durand', 'ijbup@gmail.com', '$2b$10$N/MGTMaigk489loRw3ZBBuv9zGOtEb19J7jXbY74RII9mRM6jDcue', NULL, '2021-08-30 12:11:44', 0, 1, 1, '2021-08-30 12:11:44', '2021-08-30 12:11:44', ''),
(40, 'Michel', 'Dupont', 'micbup@gmail.com', '$2b$10$5TMbLiLdPfvJdz591YV0Q.hyPlbZ30gzMJtjkC.NK/ooSRJkpxswy', NULL, '2021-08-31 14:51:46', 0, 1, 1, '2021-08-31 14:51:46', '2021-08-31 14:51:46', ''),
(41, 'Test', 'Test', 'test@exmple.com', '$2b$10$GzF85OxgrFZdtYIAuBNe6ugKyM3hXQVNqvTvIt.0FJyll69D2.8CC', NULL, '2021-08-31 16:00:53', 0, 1, 1, '2021-08-31 16:00:53', '2021-08-31 16:00:53', 'test'),
(43, 'user', 'user', 'user@exemple.com', '$2b$10$/8Y1ebmF.NHEJGmO7mWCMuL8uyRIGaBHtnAX6qbqEHMycQsMpZfdC', NULL, '2021-08-31 18:04:54', 0, 1, 1, '2021-08-31 18:04:54', '2021-08-31 18:04:54', ''),
(45, 'Admin', 'Admin', 'admin@exemple.com', '$2b$10$qpKVqI.v24sro/cvfJBkGeAic6W93p4ftDa6aSCYTtLX0wAur1X..', NULL, '2021-08-31 18:09:29', 1, 1, 1, '2021-08-31 18:09:29', '2021-08-31 18:09:29', ''),
(46, 'Jean-Marc', 'Yellow', 'jmjbup@gmail.com', '$2b$10$EcPzrQALscKdKDShR7fZQuz4pPqlaRYbdz6T4UqFgjElEXMK8bfCm', NULL, '2021-09-02 13:53:14', 0, 1, 1, '2021-09-02 13:53:14', '2021-09-02 13:53:14', '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `postComments`
--
ALTER TABLE `postComments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postComments_ibfk_2` (`postId`);

--
-- Index pour la table `postLikes`
--
ALTER TABLE `postLikes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `authorId` (`authorId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `postComments`
--
ALTER TABLE `postComments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `postLikes`
--
ALTER TABLE `postLikes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `postComments`
--
ALTER TABLE `postComments`
  ADD CONSTRAINT `postComments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postComments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `postLikes`
--
ALTER TABLE `postLikes`
  ADD CONSTRAINT `postLikes_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postLikes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
