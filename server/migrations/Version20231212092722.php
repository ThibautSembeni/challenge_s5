<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231212092722 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE clinics ADD manager_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE clinics ADD CONSTRAINT FK_D7053B66783E3463 FOREIGN KEY (manager_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_D7053B66783E3463 ON clinics (manager_id)');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT fk_8d93d649cc22ad4');
        $this->addSql('DROP INDEX uniq_8d93d649cc22ad4');
        $this->addSql('ALTER TABLE "user" DROP clinic_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE clinics DROP CONSTRAINT FK_D7053B66783E3463');
        $this->addSql('DROP INDEX IDX_D7053B66783E3463');
        $this->addSql('ALTER TABLE clinics DROP manager_id');
        $this->addSql('ALTER TABLE "user" ADD clinic_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT fk_8d93d649cc22ad4 FOREIGN KEY (clinic_id) REFERENCES clinics (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_8d93d649cc22ad4 ON "user" (clinic_id)');
    }
}
