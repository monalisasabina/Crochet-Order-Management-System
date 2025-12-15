import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
 
// seed command: npx prisma db seed

// main function
async function main() {

    console.log('Seeding database...');

    // Clearing existing data
    await prisma.order.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.client.deleteMany();
    await prisma.admin.deleteMany();


    // Creating 2 Admins
    console.log('Creating admins...');
    const admins = await Promise.all([
        prisma.admin.create({
            data: {
                firstName: 'Monalisa',
                lastName: 'Sabina',
                userName: 'smonalisa',
                email: 'monlisasabina@crochet.com',
                password: await bcrypt.hash('password123', 10),
            },
        }),

        prisma.admin.create({
            data: {
                firstName: 'John',
                lastName: 'Doe',
                userName: 'johndoe',
                email: 'johndoe@crochet.com',
                password: await bcrypt.hash('password123', 10),
            },
        }),
    ]);
    console.log(`Created ${admins.length} admins.`);
    console.log(admins);

    // Create 15 Clients
    console.log('Creating clients...');
    const clients = await Promise.all([
        prisma.client.create({ data: { firstName: 'Emma', lastName: 'Thompson', mobile: '+1-555-0101' } }),
        prisma.client.create({ data: { firstName: 'Olivia', lastName: 'Martinez', mobile: '+1-555-0102' } }),
        prisma.client.create({ data: { firstName: 'Ava', lastName: 'Garcia', mobile: '+1-555-0103' } }),
         prisma.client.create({ data: { firstName: 'Sophia', lastName: 'Anderson', mobile: '+1-555-0104' } }),
        prisma.client.create({ data: { firstName: 'Isabella', lastName: 'Taylor', mobile: '+1-555-0105' } }),
        prisma.client.create({ data: { firstName: 'Mia', lastName: 'Brown', mobile: '+1-555-0106' } }),
        prisma.client.create({ data: { firstName: 'Charlotte', lastName: 'Wilson', mobile: '+1-555-0107' } }),
        prisma.client.create({ data: { firstName: 'Amelia', lastName: 'Moore', mobile: '+1-555-0108' } }),
        prisma.client.create({ data: { firstName: 'Harper', lastName: 'Jackson', mobile: '+1-555-0109' } }),
        prisma.client.create({ data: { firstName: 'Evelyn', lastName: 'White', mobile: '+1-555-0110' } }),
         prisma.client.create({ data: { firstName: 'Abigail',  lastName: 'Harris', mobile: '+1-555-0111' } }),
         prisma.client.create({ data: { firstName: 'Emily', lastName: 'Clark', mobile: '+1-555-0112' } }),
        prisma.client.create({ data: { firstName: 'Elizabeth', lastName: 'Lewis', mobile: '+1-555-0113' } }),
        prisma.client.create({ data: { firstName: 'Sofia', lastName: 'Robinson', mobile: '+1-555-0114' } }),
        prisma.client.create({ data: { firstName: 'Avery', lastName: 'Walker', mobile: '+1-555-0115' } }),
  ]);
  console.log(`✅ Created ${clients.length} clients`);


   //Creating 15 orders   
    console.log('Creating orders...');
    console.log('Creating orders...');
    const orders = await Promise.all([
       prisma.order.create({
          data: {
          title: 'Handmade Baby Blanket',
          imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
          isCompleted: true,
          startDate: new Date('2024-11-01'),
          endDate: new Date('2024-11-15'),
          clientId: clients[0].id,
          },
        }),

    prisma.order.create({
      data: {
        title: 'Crochet Amigurumi Bear',
        imageUrl: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400',
        isCompleted: true,
        startDate: new Date('2024-11-05'),
        endDate: new Date('2024-11-20'),
        clientId: clients[1].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Winter Scarf Set',
        imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400',
        isCompleted: false,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-20'),
        clientId: clients[2].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Decorative Throw Pillows',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        isCompleted: false,
        startDate: new Date('2024-12-05'),
        endDate: new Date('2024-12-25'),
        clientId: clients[3].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Colorful Market Bag',
        imageUrl: 'https://images.unsplash.com/photo-1590739225017-e52e6a7eb25f?w=400',
        isCompleted: true,
        startDate: new Date('2024-10-15'),
        endDate: new Date('2024-10-30'),
        clientId: clients[4].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Baby Booties and Hat Set',
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
        isCompleted: true,
        startDate: new Date('2024-11-10'),
        endDate: new Date('2024-11-25'),
        clientId: clients[5].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Granny Square Afghan',
        imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
        isCompleted: false,
        startDate: new Date('2024-12-08'),
        endDate: new Date('2024-12-30'),
        clientId: clients[6].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Crochet Headband',
        imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400',
        isCompleted: true,
        startDate: new Date('2024-11-20'),
        endDate: new Date('2024-11-28'),
        clientId: clients[7].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Cozy Lap Blanket',
        imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
        isCompleted: false,
        startDate: new Date('2024-12-10'),
        endDate: new Date('2025-01-05'),
        clientId: clients[8].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Amigurumi Bunny Family',
        imageUrl: 'https://images.unsplash.com/photo-1608452964553-9b4d97b2752f?w=400',
        isCompleted: false,
        startDate: new Date('2024-12-12'),
        endDate: new Date('2025-01-10'),
        clientId: clients[9].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Kitchen Dishcloth Set',
        imageUrl: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400',
        isCompleted: true,
        startDate: new Date('2024-11-15'),
        endDate: new Date('2024-11-22'),
        clientId: clients[10].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Wedding Gift Doily',
        imageUrl: 'https://images.unsplash.com/photo-1452696024753-c5e8fabc1a0d?w=400',
        isCompleted: true,
        startDate: new Date('2024-10-20'),
        endDate: new Date('2024-11-05'),
        clientId: clients[11].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Pet Bed Cushion',
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
        isCompleted: false,
        startDate: new Date('2024-12-15'),
        endDate: new Date('2025-01-15'),
        clientId: clients[12].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Christmas Stocking',
        imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
        isCompleted: false,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-23'),
        clientId: clients[13].id,
      },
    }),
    prisma.order.create({
      data: {
        title: 'Boho Wall Hanging',
        imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
        isCompleted: true,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-18'),
        clientId: clients[14].id,
      },
     }),
   ]);
   console.log(`✅ Created ${orders.length} orders`);

   //Creating 15 notifications
   console.log('Creating notifications...');
   const notifications = await Promise.all([
    prisma.notification.create({
      data: { message: 'New order received from Emma Thompson', isRead: false },
    }),
    prisma.notification.create({
      data: { message: 'Order #1 has been completed', isRead: true },
    }),
    prisma.notification.create({
      data: { message: 'Payment received for Baby Blanket order', isRead: true },
    }),
    prisma.notification.create({
      data: { message: 'New order: Winter Scarf Set', isRead: false },
    }),
    prisma.notification.create({
      data: { message: 'Client Olivia Martinez requested order modification', isRead: false },
    }),
    prisma.notification.create({
      data: { message: 'Order deadline approaching: Decorative Throw Pillows', isRead: false },
    }),
    prisma.notification.create({
      data: { message: 'New client registration: Sofia Robinson', isRead: true },
    }),
    prisma.notification.create({
      data: { message: 'Order #5 shipped successfully', isRead: true },
    }),
    prisma.notification.create({
      data: { message: 'Low stock alert: Blue yarn running low', isRead: false },
    }),
    prisma.notification.create({
      data: { message: 'Customer review received: 5 stars!', isRead: true },
    }),
    prisma.notification.create({
      data: { message: 'New order request: Custom wedding gift', isRead: false },
    }),
    prisma.notification.create({
      data: { message: 'Order cancellation request from Avery Walker', isRead: false },
    }),
    prisma.notification.create({
      data: { message: 'Bulk order inquiry received', isRead: true },
    }),
    prisma.notification.create({
      data: { message: 'Monthly sales report ready', isRead: false },
    }),
    prisma.notification.create({
      data: { message: 'New message from Harper Jackson', isRead: false },
    }),
  ]);
  console.log(`✅ Created ${notifications.length} notifications`);

  console.log('🎉 Database seeding completed successfully!');
}

// execute the main function
main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  



