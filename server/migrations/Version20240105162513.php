<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240105162513 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment_history DROP CONSTRAINT fk_b6994263efe2feb');
        $this->addSql('DROP INDEX idx_b6994263efe2feb');
        $this->addSql('ALTER TABLE appointment_history RENAME COLUMN veterinarian_id_id TO veterinarian_id');
        $this->addSql('ALTER TABLE appointment_history ADD CONSTRAINT FK_B6994263804C8213 FOREIGN KEY (veterinarian_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_B6994263804C8213 ON appointment_history (veterinarian_id)');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT fk_6a41727aefe2feb');
        $this->addSql('DROP INDEX idx_6a41727aefe2feb');
        $this->addSql('ALTER TABLE appointments RENAME COLUMN veterinarian_id_id TO veterinarian_id');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727A804C8213 FOREIGN KEY (veterinarian_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_6A41727A804C8213 ON appointments (veterinarian_id)');
        $this->addSql('ALTER TABLE schedules DROP CONSTRAINT fk_313bdc8eefe2feb');
        $this->addSql('DROP INDEX idx_313bdc8eefe2feb');
        $this->addSql('ALTER TABLE schedules RENAME COLUMN veterinarian_id_id TO veterinarian_id');
        $this->addSql('ALTER TABLE schedules ADD CONSTRAINT FK_313BDC8E804C8213 FOREIGN KEY (veterinarian_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_313BDC8E804C8213 ON schedules (veterinarian_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727A804C8213');
        $this->addSql('DROP INDEX IDX_6A41727A804C8213');
        $this->addSql('ALTER TABLE appointments RENAME COLUMN veterinarian_id TO veterinarian_id_id');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT fk_6a41727aefe2feb FOREIGN KEY (veterinarian_id_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_6a41727aefe2feb ON appointments (veterinarian_id_id)');
        $this->addSql('ALTER TABLE appointment_history DROP CONSTRAINT FK_B6994263804C8213');
        $this->addSql('DROP INDEX IDX_B6994263804C8213');
        $this->addSql('ALTER TABLE appointment_history RENAME COLUMN veterinarian_id TO veterinarian_id_id');
        $this->addSql('ALTER TABLE appointment_history ADD CONSTRAINT fk_b6994263efe2feb FOREIGN KEY (veterinarian_id_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_b6994263efe2feb ON appointment_history (veterinarian_id_id)');
        $this->addSql('ALTER TABLE schedules DROP CONSTRAINT FK_313BDC8E804C8213');
        $this->addSql('DROP INDEX IDX_313BDC8E804C8213');
        $this->addSql('ALTER TABLE schedules RENAME COLUMN veterinarian_id TO veterinarian_id_id');
        $this->addSql('ALTER TABLE schedules ADD CONSTRAINT fk_313bdc8eefe2feb FOREIGN KEY (veterinarian_id_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_313bdc8eefe2feb ON schedules (veterinarian_id_id)');
    }
}
