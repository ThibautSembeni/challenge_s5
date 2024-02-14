<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240213135509 extends AbstractMigration
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
        $this->addSql('CREATE SEQUENCE clinic_complementary_information_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE clinic_schedules_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE feedbacks_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE notifications_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE payments_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE pets_uuid_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE refresh_tokens_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE schedules_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE services_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE time_slots_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE veterinarians_uuid_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE appointment_history (id INT NOT NULL, appointment_id INT DEFAULT NULL, veterinarian_id UUID DEFAULT NULL, status JSON NOT NULL, datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B6994263E5B533F9 ON appointment_history (appointment_id)');
        $this->addSql('CREATE INDEX IDX_B6994263804C8213 ON appointment_history (veterinarian_id)');
        $this->addSql('COMMENT ON COLUMN appointment_history.veterinarian_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE appointment_services (id INT NOT NULL, appointment_id INT DEFAULT NULL, service_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_46166AA1E5B533F9 ON appointment_services (appointment_id)');
        $this->addSql('CREATE INDEX IDX_46166AA1ED5CA9E6 ON appointment_services (service_id)');
        $this->addSql('CREATE TABLE appointments (id INT NOT NULL, veterinarian_id UUID DEFAULT NULL, user_id_id INT DEFAULT NULL, pet_id UUID DEFAULT NULL, schedules_id INT DEFAULT NULL, service_id INT DEFAULT NULL, uuid UUID NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6A41727AD17F50A6 ON appointments (uuid)');
        $this->addSql('CREATE INDEX IDX_6A41727A804C8213 ON appointments (veterinarian_id)');
        $this->addSql('CREATE INDEX IDX_6A41727A9D86650F ON appointments (user_id_id)');
        $this->addSql('CREATE INDEX IDX_6A41727A966F7FB6 ON appointments (pet_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6A41727A116C90BC ON appointments (schedules_id)');
        $this->addSql('CREATE INDEX IDX_6A41727AED5CA9E6 ON appointments (service_id)');
        $this->addSql('COMMENT ON COLUMN appointments.veterinarian_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN appointments.pet_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN appointments.uuid IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE clinic_complementary_information (id INT NOT NULL, clinic_id UUID DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_25053A75CC22AD4 ON clinic_complementary_information (clinic_id)');
        $this->addSql('COMMENT ON COLUMN clinic_complementary_information.clinic_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE clinic_schedules (id INT NOT NULL, clinic_id UUID DEFAULT NULL, timeslot_id INT DEFAULT NULL, day VARCHAR(20) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_CE878BE5CC22AD4 ON clinic_schedules (clinic_id)');
        $this->addSql('CREATE INDEX IDX_CE878BE5F920B9E9 ON clinic_schedules (timeslot_id)');
        $this->addSql('COMMENT ON COLUMN clinic_schedules.clinic_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE clinics (uuid UUID NOT NULL, manager_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(20) NOT NULL, latitude DOUBLE PRECISION DEFAULT NULL, longitude DOUBLE PRECISION DEFAULT NULL, city VARCHAR(50) NOT NULL, postal_code VARCHAR(15) NOT NULL, description TEXT DEFAULT NULL, is_actif BOOLEAN DEFAULT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(uuid))');
        $this->addSql('CREATE INDEX IDX_D7053B66783E3463 ON clinics (manager_id)');
        $this->addSql('COMMENT ON COLUMN clinics.uuid IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE feedbacks (id INT NOT NULL, appointment_id INT NOT NULL, rating INT NOT NULL, comment TEXT DEFAULT NULL, verify BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_7E6C3F89E5B533F9 ON feedbacks (appointment_id)');
        $this->addSql('CREATE TABLE notifications (id INT NOT NULL, user_id_id INT DEFAULT NULL, message TEXT NOT NULL, datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6000B0D39D86650F ON notifications (user_id_id)');
        $this->addSql('CREATE TABLE payments (id INT NOT NULL, person_id INT DEFAULT NULL, clinic_id UUID DEFAULT NULL, stripe_payment_id VARCHAR(255) NOT NULL, amount DOUBLE PRECISION NOT NULL, status VARCHAR(50) NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_65D29B32217BBB47 ON payments (person_id)');
        $this->addSql('CREATE INDEX IDX_65D29B32CC22AD4 ON payments (clinic_id)');
        $this->addSql('COMMENT ON COLUMN payments.clinic_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE pets (uuid UUID NOT NULL, user_id_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, species VARCHAR(255) NOT NULL, breed VARCHAR(255) NOT NULL, birthdate DATE NOT NULL, medical_history TEXT DEFAULT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(uuid))');
        $this->addSql('CREATE INDEX IDX_8638EA3F9D86650F ON pets (user_id_id)');
        $this->addSql('COMMENT ON COLUMN pets.uuid IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE refresh_tokens (id INT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9BACE7E1C74F2195 ON refresh_tokens (refresh_token)');
        $this->addSql('CREATE TABLE schedules (id INT NOT NULL, veterinarian_id UUID DEFAULT NULL, day VARCHAR(255) NOT NULL, start_time TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, end_time TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, type VARCHAR(50) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_313BDC8E804C8213 ON schedules (veterinarian_id)');
        $this->addSql('COMMENT ON COLUMN schedules.veterinarian_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE services (id INT NOT NULL, veterinarian_id UUID DEFAULT NULL, description TEXT NOT NULL, price NUMERIC(10, 2) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_7332E169804C8213 ON services (veterinarian_id)');
        $this->addSql('COMMENT ON COLUMN services.veterinarian_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE time_slots (id INT NOT NULL, start_time TIME(0) WITHOUT TIME ZONE DEFAULT NULL, end_time TIME(0) WITHOUT TIME ZONE DEFAULT NULL, is_open BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, firstname VARCHAR(180) NOT NULL, lastname VARCHAR(180) NOT NULL, address VARCHAR(255) DEFAULT NULL, phone VARCHAR(20) DEFAULT NULL, city VARCHAR(50) DEFAULT NULL, postal_code VARCHAR(15) DEFAULT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, uuid UUID NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649D17F50A6 ON "user" (uuid)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('COMMENT ON COLUMN "user".uuid IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE veterinarians (uuid UUID NOT NULL, clinic_id UUID DEFAULT NULL, user_id INT DEFAULT NULL, lastname VARCHAR(100) NOT NULL, firstname VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(20) DEFAULT NULL, specialties VARCHAR(255) DEFAULT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(uuid))');
        $this->addSql('CREATE INDEX IDX_6B2A679CCC22AD4 ON veterinarians (clinic_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6B2A679CA76ED395 ON veterinarians (user_id)');
        $this->addSql('COMMENT ON COLUMN veterinarians.uuid IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN veterinarians.clinic_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE appointment_history ADD CONSTRAINT FK_B6994263E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointments (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment_history ADD CONSTRAINT FK_B6994263804C8213 FOREIGN KEY (veterinarian_id) REFERENCES veterinarians (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment_services ADD CONSTRAINT FK_46166AA1E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointments (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment_services ADD CONSTRAINT FK_46166AA1ED5CA9E6 FOREIGN KEY (service_id) REFERENCES services (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727A804C8213 FOREIGN KEY (veterinarian_id) REFERENCES veterinarians (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727A9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727A966F7FB6 FOREIGN KEY (pet_id) REFERENCES pets (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727A116C90BC FOREIGN KEY (schedules_id) REFERENCES schedules (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointments ADD CONSTRAINT FK_6A41727AED5CA9E6 FOREIGN KEY (service_id) REFERENCES services (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE clinic_complementary_information ADD CONSTRAINT FK_25053A75CC22AD4 FOREIGN KEY (clinic_id) REFERENCES clinics (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE clinic_schedules ADD CONSTRAINT FK_CE878BE5CC22AD4 FOREIGN KEY (clinic_id) REFERENCES clinics (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE clinic_schedules ADD CONSTRAINT FK_CE878BE5F920B9E9 FOREIGN KEY (timeslot_id) REFERENCES time_slots (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE clinics ADD CONSTRAINT FK_D7053B66783E3463 FOREIGN KEY (manager_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedbacks ADD CONSTRAINT FK_7E6C3F89E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointments (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D39D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE payments ADD CONSTRAINT FK_65D29B32217BBB47 FOREIGN KEY (person_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE payments ADD CONSTRAINT FK_65D29B32CC22AD4 FOREIGN KEY (clinic_id) REFERENCES clinics (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE pets ADD CONSTRAINT FK_8638EA3F9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE schedules ADD CONSTRAINT FK_313BDC8E804C8213 FOREIGN KEY (veterinarian_id) REFERENCES veterinarians (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE services ADD CONSTRAINT FK_7332E169804C8213 FOREIGN KEY (veterinarian_id) REFERENCES veterinarians (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE veterinarians ADD CONSTRAINT FK_6B2A679CCC22AD4 FOREIGN KEY (clinic_id) REFERENCES clinics (uuid) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE veterinarians ADD CONSTRAINT FK_6B2A679CA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE appointment_history_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE appointment_services_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE appointments_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE clinic_complementary_information_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE clinic_schedules_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE feedbacks_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE notifications_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE payments_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE pets_uuid_seq CASCADE');
        $this->addSql('DROP SEQUENCE refresh_tokens_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE schedules_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE services_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE time_slots_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE veterinarians_uuid_seq CASCADE');
        $this->addSql('ALTER TABLE appointment_history DROP CONSTRAINT FK_B6994263E5B533F9');
        $this->addSql('ALTER TABLE appointment_history DROP CONSTRAINT FK_B6994263804C8213');
        $this->addSql('ALTER TABLE appointment_services DROP CONSTRAINT FK_46166AA1E5B533F9');
        $this->addSql('ALTER TABLE appointment_services DROP CONSTRAINT FK_46166AA1ED5CA9E6');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727A804C8213');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727A9D86650F');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727A966F7FB6');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727A116C90BC');
        $this->addSql('ALTER TABLE appointments DROP CONSTRAINT FK_6A41727AED5CA9E6');
        $this->addSql('ALTER TABLE clinic_complementary_information DROP CONSTRAINT FK_25053A75CC22AD4');
        $this->addSql('ALTER TABLE clinic_schedules DROP CONSTRAINT FK_CE878BE5CC22AD4');
        $this->addSql('ALTER TABLE clinic_schedules DROP CONSTRAINT FK_CE878BE5F920B9E9');
        $this->addSql('ALTER TABLE clinics DROP CONSTRAINT FK_D7053B66783E3463');
        $this->addSql('ALTER TABLE feedbacks DROP CONSTRAINT FK_7E6C3F89E5B533F9');
        $this->addSql('ALTER TABLE notifications DROP CONSTRAINT FK_6000B0D39D86650F');
        $this->addSql('ALTER TABLE payments DROP CONSTRAINT FK_65D29B32217BBB47');
        $this->addSql('ALTER TABLE payments DROP CONSTRAINT FK_65D29B32CC22AD4');
        $this->addSql('ALTER TABLE pets DROP CONSTRAINT FK_8638EA3F9D86650F');
        $this->addSql('ALTER TABLE schedules DROP CONSTRAINT FK_313BDC8E804C8213');
        $this->addSql('ALTER TABLE services DROP CONSTRAINT FK_7332E169804C8213');
        $this->addSql('ALTER TABLE veterinarians DROP CONSTRAINT FK_6B2A679CCC22AD4');
        $this->addSql('ALTER TABLE veterinarians DROP CONSTRAINT FK_6B2A679CA76ED395');
        $this->addSql('DROP TABLE appointment_history');
        $this->addSql('DROP TABLE appointment_services');
        $this->addSql('DROP TABLE appointments');
        $this->addSql('DROP TABLE clinic_complementary_information');
        $this->addSql('DROP TABLE clinic_schedules');
        $this->addSql('DROP TABLE clinics');
        $this->addSql('DROP TABLE feedbacks');
        $this->addSql('DROP TABLE notifications');
        $this->addSql('DROP TABLE payments');
        $this->addSql('DROP TABLE pets');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE schedules');
        $this->addSql('DROP TABLE services');
        $this->addSql('DROP TABLE time_slots');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE veterinarians');
    }
}
