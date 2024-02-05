<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231213181301 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE payments_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE payments (id INT NOT NULL, person_id INT DEFAULT NULL, clinic_id INT DEFAULT NULL, stripe_payment_id VARCHAR(255) NOT NULL, amount DOUBLE PRECISION NOT NULL, status VARCHAR(50) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_65D29B32217BBB47 ON payments (person_id)');
        $this->addSql('CREATE INDEX IDX_65D29B32CC22AD4 ON payments (clinic_id)');
        $this->addSql('ALTER TABLE payments ADD CONSTRAINT FK_65D29B32217BBB47 FOREIGN KEY (person_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE payments ADD CONSTRAINT FK_65D29B32CC22AD4 FOREIGN KEY (clinic_id) REFERENCES clinics (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE payments_id_seq CASCADE');
        $this->addSql('ALTER TABLE payments DROP CONSTRAINT FK_65D29B32217BBB47');
        $this->addSql('ALTER TABLE payments DROP CONSTRAINT FK_65D29B32CC22AD4');
        $this->addSql('DROP TABLE payments');
    }
}
