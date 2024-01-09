<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240105163211 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT fk_6a41727ad2385ef4');
        $this->addSql('DROP INDEX idx_6a41727ad2385ef4');
        $this->addSql('ALTER TABLE appointments RENAME COLUMN pet_id_id TO pet_id');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727A966F7FB6 FOREIGN KEY (pet_id) REFERENCES pets (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_6A41727A966F7FB6 ON appointments (pet_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727A966F7FB6');
        $this->addSql('DROP INDEX IDX_6A41727A966F7FB6');
        $this->addSql('ALTER TABLE appointments RENAME COLUMN pet_id TO pet_id_id');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT fk_6a41727ad2385ef4 FOREIGN KEY (pet_id_id) REFERENCES pets (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_6a41727ad2385ef4 ON appointments (pet_id_id)');
    }
}
