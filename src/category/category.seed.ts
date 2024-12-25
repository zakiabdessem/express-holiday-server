import { DataSource } from 'typeorm';
import { Category } from './category.schema';
import { Subcategory } from './subcategory.schema';

export class CategorySeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);
    const subcategoryRepository = dataSource.getRepository(Subcategory);

    const categoriesData = [
      {
        name: 'Service Billetterie aerienne',
        subcategories: [
          {
            nameFr: 'Demande / Réclamation D’un Billet',
            nameEn: 'Request / Claim For A Ticket (1)',
          },
          {
            nameFr: "Demande De Remboursement D'un Billet",
            nameEn: 'Ticket Refund Request (2)',
          },
          {
            nameFr: "Demande De Modification D'un Billet",
            nameEn: 'Ticket Modification Request (3)',
          },
          {
            nameFr: "Demande De Confirmation D'un Billet",
            nameEn: 'Ticket Confirmation Request (4)',
          },
          {
            nameFr: 'Demande De Connexion RTS',
            nameEn: 'RTS Connection Request',
          },
          {
            nameFr: 'Demande De Tarif Spécial',
            nameEn: 'Special Rate Request',
          },
        ],
      },
      {
        name: 'Service hôtellerie',
        subcategories: [
          {
            nameFr: "Demande De Remboursement D'un Hôtel",
            nameEn: 'Hotel Refund Request',
          },
          {
            nameFr: 'Demande De Modification D’un Hôtel',
            nameEn: 'Hotel Modification Request',
          },
          { nameFr: 'Réclamation D’un Hotel', nameEn: 'Hotel Complaint' },
          { nameFr: "Demande D'un Transfert", nameEn: 'Request A Transfer' },
          {
            nameFr: "Demande De Confirmation D'un Hôtel",
            nameEn: 'Hotel Confirmation Request',
          },
          { nameFr: 'Demande Diverse', nameEn: 'Divers Request' },
        ],
      },
      {
        name: 'Service Finance',
        subcategories: [
          {
            nameFr: 'Demande Du Solde Virtuel',
            nameEn: 'Virtual Balance Request',
          },
          { nameFr: 'Ajout D’un Règlement', nameEn: 'Payment Addition' },
          {
            nameFr: 'Réclamations Au Service Finance',
            nameEn: 'Complaints To The Finance Department',
          },
        ],
      },
      {
        name: 'Service Commercial -- Sales departement',
        subcategories: [
          { nameFr: 'Demande Bloc De Siège', nameEn: 'Seat Block Request' },
          {
            nameFr: 'Demande Groupe (Hôtels)',
            nameEn: 'Group Request (Hotels)',
          },
          { nameFr: 'Demande Diverse', nameEn: 'Divers Request' },
          {
            nameFr: "Demande activation De L'accès À L'étranger",
            nameEn: 'Activation Request for Foreign Access',
          },
        ],
      },
      {
        name: 'Service Omra & Voyages Organises',
        subcategories: [
          { nameFr: 'Demande Devis Omra', nameEn: 'Umrah Quote Request' },
          {
            nameFr: 'Demande Devis Voyage Organisé',
            nameEn: 'Organized Trip Quote Request',
          },
        ],
      },
      {
        name: 'Billetterie Martitime',
        subcategories: [
          { nameFr: 'Tunisie-France', nameEn: 'Tunisia-France' },
          { nameFr: 'Algerie-Espagne', nameEn: 'Algeria-Spain' },
          { nameFr: 'Tunisie-Italie', nameEn: 'Tunisia-Italy' },
        ],
      },
      {
        name: 'Service technique',
        subcategories: [{ nameFr: 'Aucune', nameEn: 'None' }],
      },
      {
        name: 'Visa department',
        subcategories: [
          { nameFr: 'Réclamation Visa', nameEn: 'Visa Complaint' },
        ],
      },
    ];

    for (const categoryData of categoriesData) {
      const category = categoryRepository.create({ name: categoryData.name });
      await categoryRepository.save(category);

      for (const subcategoryData of categoryData.subcategories) {
        const subcategory = subcategoryRepository.create({
          ...subcategoryData,
          category,
        });
        await subcategoryRepository.save(subcategory);
      }
    }
  }
}
