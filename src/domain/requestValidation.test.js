
import { describe, it, expect } from 'vitest';
import { validateRequest } from './requestValidation.js';

describe('Доменна валідація заявок (validateRequest)', () => {
  const mockServices = [
    { id: '1', name: 'Капітальний ремонт' },
    { id: '2', name: 'Косметичний ремонт' },
  ];

  const validData = {
    serviceId: '1',
    customerName: 'Олександр',
    phone: '+380501234567',
    description: 'Потрібно зробити ремонт у вітальні.',
    area: 45,
    needsSurvey: false,
  };

  it('успішно проходить валідацію при коректних даних', () => {
    const result = validateRequest(validData, mockServices);
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.value.customerName).toBe('Олександр');
  });

  it('видає помилку, якщо послуга відсутня в каталозі', () => {
    const result = validateRequest(
      { ...validData, serviceId: '999' },
      mockServices
    );
    expect(result.ok).toBe(false);
    expect(result.errors.serviceId).toBeDefined();
  });

  it('відхиляє занадто коротке ім’я', () => {
    const result = validateRequest(
      { ...validData, customerName: 'А' },
      mockServices
    );
    expect(result.errors.customerName).toBeDefined();
  });

  it('відхиляє неправильний номер телефону', () => {
    const result = validateRequest(
      { ...validData, phone: '123456789' },
      mockServices
    );
    expect(result.errors.phone).toBeDefined();
  });

  it('відхиляє закороткий опис робіт', () => {
    const result = validateRequest(
      { ...validData, description: 'Ремонт' },
      mockServices
    );
    expect(result.errors.description).toBeDefined();
  });

  it('відхиляє некоректну площу', () => {
    const result = validateRequest(
      { ...validData, area: 0 },
      mockServices
    );
    expect(result.errors.area).toBeDefined();
  });

  it('вимагає виїзд для замірів при площі понад 100 м²', () => {
    const result = validateRequest(
      { ...validData, area: 150, needsSurvey: false },
      mockServices
    );
    expect(result.errors.needsSurvey).toBeDefined();
  });

  it('дозволяє площу понад 100 м² із позначеним виїздом', () => {
    const result = validateRequest(
      { ...validData, area: 150, needsSurvey: true },
      mockServices
    );
    expect(result.ok).toBe(true);
  });
});
