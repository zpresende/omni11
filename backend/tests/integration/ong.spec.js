const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/config/connection');

describe('Create ONG', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	it('should be able to create a new ONG', async () => {
		const { body } = await request(app)
			.post('/ongs')
			.send({
				name: 'Test',
				email: 'test@test.com',
				whatsapp: '351123456789',
				city: 'Lisbon',
				country: 'Portugal'
			});
		expect(body).toHaveProperty('id');
		expect(body.id).toHaveLength(8);
	});

	afterAll(async () => {
		await connection.destroy();
	});
});
