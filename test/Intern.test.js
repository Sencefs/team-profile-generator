const Intern = require('../lib/Intern');  
test('creates an Intern object', () => {
    const intern = new Intern('Jam', 0, 'jam@gmail', 'ABC Mouse');
    expect(intern.school) .toEqual(expect.any(String));
});
test('gets employee school', () => {
    const intern = new Intern('Jam', 0, 'jam@gmail', 'ABC Mouse');
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});
test('gets role of employee', () => {
    const intern = new Intern('Jam', 0, 'jam@gmail', 'ABC Mouse');
    expect(intern.getRole()).toEqual("Intern");
}); 