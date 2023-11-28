<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231128134728 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE clinic_complementary_information_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE clinic_complementary_information (id INT NOT NULL, clinic_id_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_25053A75F6C03764 ON clinic_complementary_information (clinic_id_id)');
        $this->addSql('ALTER TABLE clinic_complementary_information ADD CONSTRAINT FK_25053A75F6C03764 FOREIGN KEY (clinic_id_id) REFERENCES clinics (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE clinic_complementary_information_id_seq CASCADE');
        $this->addSql('ALTER TABLE clinic_complementary_information DROP CONSTRAINT FK_25053A75F6C03764');
        $this->addSql('DROP TABLE clinic_complementary_information');
    }
}
