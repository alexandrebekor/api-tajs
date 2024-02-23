import { describe, it, expect } from '@jest/globals'
import Person from '../src/person';

describe('# Person', () => {
  it('should throw if the name is not provided', () => {
    const mockInvalidPerson = {
      name: '',
      age: 30
    };

    expect(() => {
      Person.validate(mockInvalidPerson);
    }).toThrow(new Error('Name is required'));
  })

  it('should throw if age is not provided', () => {
    const mockInvalidPerson = {
      name: 'John',
      age: ''
    };

    expect(() => {
      Person.validate(mockInvalidPerson);
    }).toThrow(new Error('Age is required'));
  })

  it('should throw if age is less than 0', () => {
    const mockInvalidPerson = {
      name: 'John',
      age: -1
    };

    expect(() => {
      Person.validate(mockInvalidPerson);
    }).toThrow(new Error('Age must be a positive number'));
  })

  it('should return true if the person is valid', () => {
    const mockValidPerson = {
      name: 'John',
      age: 30
    };

    const result = Person.validate(mockValidPerson);
    expect(result).toStrictEqual(mockValidPerson);
  })
})