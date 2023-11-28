<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231128093611 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE clinics ADD uuid UUID NOT NULL');
        $this->addSql('COMMENT ON COLUMN clinics.uuid IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D7053B66D17F50A6 ON clinics (uuid)');
        $this->addSql('ALTER TABLE veterinarians ADD uuid UUID NOT NULL');
        $this->addSql('COMMENT ON COLUMN veterinarians.uuid IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6B2A679CD17F50A6 ON veterinarians (uuid)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_6B2A679CD17F50A6');
        $this->addSql('ALTER TABLE veterinarians DROP uuid');
        $this->addSql('DROP INDEX UNIQ_D7053B66D17F50A6');
        $this->addSql('ALTER TABLE clinics DROP uuid');
    }
}
