<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231128105827 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE clinic_schedules_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE time_slots_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE clinic_schedules (id INT NOT NULL, clinic_id_id INT DEFAULT NULL, timeslot_id_id INT DEFAULT NULL, day VARCHAR(20) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_CE878BE5F6C03764 ON clinic_schedules (clinic_id_id)');
        $this->addSql('CREATE INDEX IDX_CE878BE5CE1B1BDF ON clinic_schedules (timeslot_id_id)');
        $this->addSql('CREATE TABLE time_slots (id INT NOT NULL, start_time TIME(0) WITHOUT TIME ZONE DEFAULT NULL, end_time TIME(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE clinic_schedules ADD CONSTRAINT FK_CE878BE5F6C03764 FOREIGN KEY (clinic_id_id) REFERENCES clinics (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE clinic_schedules ADD CONSTRAINT FK_CE878BE5CE1B1BDF FOREIGN KEY (timeslot_id_id) REFERENCES time_slots (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE clinic_schedules_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE time_slots_id_seq CASCADE');
        $this->addSql('ALTER TABLE clinic_schedules DROP CONSTRAINT FK_CE878BE5F6C03764');
        $this->addSql('ALTER TABLE clinic_schedules DROP CONSTRAINT FK_CE878BE5CE1B1BDF');
        $this->addSql('DROP TABLE clinic_schedules');
        $this->addSql('DROP TABLE time_slots');
    }
}
