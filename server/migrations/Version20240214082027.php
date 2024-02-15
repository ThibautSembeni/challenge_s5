<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240214082027 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE pets_uuid_seq CASCADE');
        $this->addSql('DROP SEQUENCE veterinarians_uuid_seq CASCADE');
        $this->addSql('ALTER TABLE clinics ADD path_kbis VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE pets_uuid_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE veterinarians_uuid_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('ALTER TABLE clinics DROP path_kbis');
    }
}
