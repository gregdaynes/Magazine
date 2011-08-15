/* Install component */
INSERT INTO `jos_components` (`name`,`link`,`menuid`,`parent`,`admin_menu_link`,`admin_menu_alt`,`option`,`ordering`,`admin_menu_img`,`iscore`,`params`,`enabled`)
VALUES ('Magazine', 'option=com_magazine', 0, 0, 'option=com_magazine', 'Magazine', 'com_magazine', 0, '', 0, '', 1);

/* Views */
CREATE VIEW jos_magazine_magazines AS SELECT * FROM magazine_developer.jos_magazine_magazines;
CREATE VIEW jos_magazine_issues AS SELECT * FROM magazine_developer.jos_magazine_issues;
CREATE VIEW jos_magazine_publishers AS SELECT * FROM magazine_developer.jos_magazine_publishers;

/* Issues */
CREATE TABLE `jos_magazine_issues` (
  `magazine_issue_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `magazine` bigint(20) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`magazine_issue_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/* Magazines */
CREATE TABLE `jos_magazine_magazines` (
  `magazine_magazine_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `publisher` bigint(20) NOT NULL,
  `description` text NOT NULL,
  `latest_issue` bigint(20) NOT NULL,
  `web_address` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`magazine_magazine_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/* Publishers */
CREATE TABLE `jos_magazine_publishers` (
  `magazine_publisher_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `web_address` varchar(255) NOT NULL DEFAULT '',
  `logo` varchar(255) NOT NULL DEFAULT '',
  `street_address` varchar(255) NOT NULL DEFAULT '',
  `telephone` varchar(255) NOT NULL DEFAULT '',
  `email_address` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `city` varchar(255) NOT NULL DEFAULT '',
  `country` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(255) NOT NULL DEFAULT '',
  `zip_code` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`magazine_publisher_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;