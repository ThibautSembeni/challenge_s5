<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231123222350 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE veterinarians DROP CONSTRAINT fk_6b2a679cf6c03764');
        $this->addSql('DROP INDEX idx_6b2a679cf6c03764');
        $this->addSql('ALTER TABLE veterinarians RENAME COLUMN clinic_id_id TO clinic_id');
        $this->addSql('ALTER TABLE veterinarians ADD CONSTRAINT FK_6B2A679CCC22AD4 FOREIGN KEY (clinic_id) REFERENCES clinics (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_6B2A679CCC22AD4 ON veterinarians (clinic_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE veterinarians DROP CONSTRAINT FK_6B2A679CCC22AD4');
        $this->addSql('DROP INDEX IDX_6B2A679CCC22AD4');
        $this->addSql('ALTER TABLE veterinarians RENAME COLUMN clinic_id TO clinic_id_id');
        $this->addSql('ALTER TABLE veterinarians ADD CONSTRAINT fk_6b2a679cf6c03764 FOREIGN KEY (clinic_id_id) REFERENCES clinics (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_6b2a679cf6c03764 ON veterinarians (clinic_id_id)');
    }
}
