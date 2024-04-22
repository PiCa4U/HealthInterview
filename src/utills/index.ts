import {Medication} from '../types';

export const sortMedications = (medications: Medication[]) => {
  return medications.sort((a, b) => {
    // Выполненные лекарства перемещаем в конец списка
    if (a.count === a.destinationCount && b.count !== b.destinationCount) {
      return 1; // 'a' выполнено, переместить вниз
    }
    if (b.count === b.destinationCount && a.count !== a.destinationCount) {
      return -1; // 'b' выполнено, 'a' должно быть выше
    }
    // Если оба выполнены или не выполнены, сортируем по дате обновления
    return b.updatedDate - a.updatedDate;
  });
};
