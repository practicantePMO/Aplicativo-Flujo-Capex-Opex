import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup, configure } from '@testing-library/react';
import { reiniciarApiFalsa } from './apiFalsa';

// Con cobertura y en equipos lentos las pantallas tardan más en aparecer.
configure({ asyncUtilTimeout: 10000 });

afterEach(() => {
  cleanup();
  reiniciarApiFalsa();
  localStorage.clear();
});
