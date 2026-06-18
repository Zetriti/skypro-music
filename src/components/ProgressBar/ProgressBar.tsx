import styles from './progressBar.module.css';
import { ChangeEvent, ReactNode } from 'react';

type progressBarProp = {
  max: number;
  value: number;
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
  children?: ReactNode;
};

export default function ProgressBar({
  max,
  value,
  step,
  onChange,
  readOnly,
  children,
}: progressBarProp) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        className={styles.styledProgressInput} // Применение стилей к ползунку
        type="range" // Тип элемента - ползунок
        min="0" // Минимальное значение ползунка
        max={max} // Максимальное значение, зависит от длительности аудио
        value={value} // Текущее значение ползунка
        step={step} // Шаг изменения значения
        onChange={onChange} // Обработчик события изменения
        readOnly={readOnly}
      />
      {children} {/* <-- отображаем дочерний элемент */}
    </div>
  );
}
