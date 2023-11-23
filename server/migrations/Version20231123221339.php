<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231123221339 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE appointment_history_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE appointment_services_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE appointments_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE clinics_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE feedbacks_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE notifications_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE pets_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE schedules_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE services_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE veterinarians_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE appointment_history (id INT NOT NULL, appointment_id_id INT DEFAULT NULL, veterinarian_id_id INT DEFAULT NULL, status JSON NOT NULL, datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B69942639334AFB9 ON appointment_history (appointment_id_id)');
        $this->addSql('CREATE INDEX IDX_B6994263EFE2FEB ON appointment_history (veterinarian_id_id)');
        $this->addSql('CREATE TABLE appointment_services (id INT NOT NULL, appointment_id_id INT DEFAULT NULL, service_id_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_46166AA19334AFB9 ON appointment_services (appointment_id_id)');
        $this->addSql('CREATE INDEX IDX_46166AA1D63673B0 ON appointment_services (service_id_id)');
        $this->addSql('CREATE TABLE appointments (id INT NOT NULL, veterinarian_id_id INT DEFAULT NULL, user_id_id INT DEFAULT NULL, pet_id_id INT DEFAULT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, reason TEXT DEFAULT NULL, status JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6A41727AEFE2FEB ON appointments (veterinarian_id_id)');
        $this->addSql('CREATE INDEX IDX_6A41727A9D86650F ON appointments (user_id_id)');
        $this->addSql('CREATE INDEX IDX_6A41727AD2385EF4 ON appointments (pet_id_id)');
        $this->addSql('CREATE TABLE clinics (id INT NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(20) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE feedbacks (id INT NOT NULL, appointment_id_id INT DEFAULT NULL, rating INT NOT NULL, comment TEXT DEFAULT NULL, datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_7E6C3F899334AFB9 ON feedbacks (appointment_id_id)');
        $this->addSql('CREATE TABLE notifications (id INT NOT NULL, user_id_id INT DEFAULT NULL, message TEXT NOT NULL, datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6000B0D39D86650F ON notifications (user_id_id)');
        $this->addSql('CREATE TABLE pets (id INT NOT NULL, user_id_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, species VARCHAR(255) NOT NULL, breed VARCHAR(255) NOT NULL, birthdate DATE NOT NULL, medical_history TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8638EA3F9D86650F ON pets (user_id_id)');
        $this->addSql('CREATE TABLE schedules (id INT NOT NULL, veterinarian_id_id INT DEFAULT NULL, day VARCHAR(255) NOT NULL, start_time TIME(0) WITHOUT TIME ZONE DEFAULT NULL, end_time TIME(0) WITHOUT TIME ZONE DEFAULT NULL, type VARCHAR(50) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_313BDC8EEFE2FEB ON schedules (veterinarian_id_id)');
        $this->addSql('CREATE TABLE services (id INT NOT NULL, description TEXT NOT NULL, price NUMERIC(10, 2) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE veterinarians (id INT NOT NULL, clinic_id_id INT DEFAULT NULL, lastname VARCHAR(100) NOT NULL, fistname VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(20) DEFAULT NULL, specialties VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6B2A679CF6C03764 ON veterinarians (clinic_id_id)');
        $this->addSql('ALTER TABLE appointment_history ADD CONSTRAINT FK_B69942639334AFB9 FOREIGN KEY (appointment_id_id) REFERENCES appointments (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment_history ADD CONSTRAINT FK_B6994263EFE2FEB FOREIGN KEY (veterinarian_id_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment_services ADD CONSTRAINT FK_46166AA19334AFB9 FOREIGN KEY (appointment_id_id) REFERENCES appointments (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment_services ADD CONSTRAINT FK_46166AA1D63673B0 FOREIGN KEY (service_id_id) REFERENCES services (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727AEFE2FEB FOREIGN KEY (veterinarian_id_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727A9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727AD2385EF4 FOREIGN KEY (pet_id_id) REFERENCES pets (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedbacks ADD CONSTRAINT FK_7E6C3F899334AFB9 FOREIGN KEY (appointment_id_id) REFERENCES appointments (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D39D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE pets ADD CONSTRAINT FK_8638EA3F9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE schedules ADD CONSTRAINT FK_313BDC8EEFE2FEB FOREIGN KEY (veterinarian_id_id) REFERENCES veterinarians (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE veterinarians ADD CONSTRAINT FK_6B2A679CF6C03764 FOREIGN KEY (clinic_id_id) REFERENCES clinics (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE appointment_history_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE appointment_services_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE appointments_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE clinics_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE feedbacks_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE notifications_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE pets_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE schedules_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE services_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE veterinarians_id_seq CASCADE');
        $this->addSql('ALTER TABLE appointment_history DROP CONSTRAINT FK_B69942639334AFB9');
        $this->addSql('ALTER TABLE appointment_history DROP CONSTRAINT FK_B6994263EFE2FEB');
        $this->addSql('ALTER TABLE appointment_services DROP CONSTRAINT FK_46166AA19334AFB9');
        $this->addSql('ALTER TABLE appointment_services DROP CONSTRAINT FK_46166AA1D63673B0');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727AEFE2FEB');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727A9D86650F');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727AD2385EF4');
        $this->addSql('ALTER TABLE feedbacks DROP CONSTRAINT FK_7E6C3F899334AFB9');
        $this->addSql('ALTER TABLE notifications DROP CONSTRAINT FK_6000B0D39D86650F');
        $this->addSql('ALTER TABLE pets DROP CONSTRAINT FK_8638EA3F9D86650F');
        $this->addSql('ALTER TABLE schedules DROP CONSTRAINT FK_313BDC8EEFE2FEB');
        $this->addSql('ALTER TABLE veterinarians DROP CONSTRAINT FK_6B2A679CF6C03764');
        $this->addSql('DROP TABLE appointment_history');
        $this->addSql('DROP TABLE appointment_services');
        $this->addSql('DROP TABLE appointments');
        $this->addSql('DROP TABLE clinics');
        $this->addSql('DROP TABLE feedbacks');
        $this->addSql('DROP TABLE notifications');
        $this->addSql('DROP TABLE pets');
        $this->addSql('DROP TABLE schedules');
        $this->addSql('DROP TABLE services');
        $this->addSql('DROP TABLE veterinarians');
    }
}
