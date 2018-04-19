const DomainScanner = require('../src/index').DomainScanner;

const testingEmail = 'bobmarley@gmail.com';

test('Created the new domain scanner object', () => {
    const scanner = new DomainScanner();
    expect(scanner).toBeTruthy();
});

test('Test an email correctly', () => {
    const scanner = new DomainScanner();
    const result = scanner.scan(testingEmail);
    expect(result).toBe(false);
});