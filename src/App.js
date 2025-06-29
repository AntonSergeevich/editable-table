import React, { useState, useRef, useEffect } from 'react';
import EditableCell from './components/EditableCell';

const App = () => {
  // Исходные данные (или из localStorage)
  const initialData = JSON.parse(localStorage.getItem('tableData')) || [
    {
      id: 1,
      fio: 'Глухов Антон Сергеевич',
      percent: '50%',
      number: '523',
      combined: 'A1B2'
    }
  ];

  const [tableData, setTableData] = useState(initialData);
  const [editedCells, setEditedCells] = useState([]);
  const [countdown, setCountdown] = useState(10);
  const [progressWidth, setProgressWidth] = useState(0);

  // ref’ы для таймаутов
  const delayRef = useRef(null);
  const intervalRef = useRef(null);

  // Сброс всех таймеров + скрыть прогресс-бар
  const clearAllTimers = () => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCountdown(10);
    setProgressWidth(0);
  };

  // Автосохранение по окончании отсчёта
  const handleSave = () => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
    console.log('Отредактированные данные:', editedCells);
    setEditedCells([]);
    clearAllTimers();
  };

  // Поставить 5-секундную задержку перед стартом 10-секундного отсчёта
  const scheduleCountdown = () => {
    clearAllTimers();
    delayRef.current = setTimeout(startCountdown, 5000);
  };

  // Запустить 10-секундный отсчёт
  const startCountdown = () => {
    setCountdown(10);
    setProgressWidth(0);

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          handleSave();
          return 0;
        }
        return prev - 1;
      });
      setProgressWidth(prev => prev + 10);
    }, 1000);
  };

  // Обновление ячейки
  const updateCell = (id, field, newValue) => {
    // меняем таблицу
    setTableData(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: newValue } : r))
    );

    // узнаём оригинал
    const orig = initialData.find(r => r.id === id)?.[field] || '';
    if (newValue !== orig) {
      setEditedCells(prev => {
        const idx = prev.findIndex(c => c.id === id && c.field === field);
        if (idx !== -1) {
          const copy = [...prev];
          copy[idx] = { id, field, value: newValue };
          return copy;
        }
        return [...prev, { id, field, value: newValue }];
      });
      // при любом изменении — пускаем задержку
      scheduleCountdown();
    } else {
      // если восстановили старое значение — убираем из списка
      setEditedCells(prev => prev.filter(c => !(c.id === id && c.field === field)));
      // и если правок больше нет — сбрасываем таймеры
      if (editedCells.length <= 1) {
        clearAllTimers();
      }
    }
  };

  // Валидация
  const validateInput = (value, type) => {
    switch (type) {
      case 'fio':
        return value.replace(/[^А-Яа-я.\s]/g, '');
      case 'percent': {
        const d = value.replace(/\D/g, '');
        return d + '%';
      }
      case 'number':
        return value.replace(/\D/g, '');
      default:
        return value;
    }
  };

  // Очистка по unmount
  useEffect(() => () => clearAllTimers(), []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 1920, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Редактируемая таблица</h1>

      <div id="editableTable" style={tableStyle}>
        <div style={headerStyle}>
          <span style={{ flex: '0 0 50px' }}>ID</span>
          <span>ФИО</span>
          <span>Проценты</span>
          <span>Число</span>
          <span>Комбинированное поле</span>
        </div>

        {tableData.map(row => (
          <div key={row.id} style={rowStyle}>
            <span style={{ flex: '0 0 50px' }}>{row.id}</span>
            <EditableCell
              value={row.fio}
              onChange={v => updateCell(row.id, 'fio', validateInput(v, 'fio'))}
              validation="fio"
              validateInput={validateInput}
              onEditStart={clearAllTimers}
              onEditEnd={() => {
                if (editedCells.length > 0) scheduleCountdown();
              }}
            />
            <EditableCell
              value={row.percent}
              onChange={v => updateCell(row.id, 'percent', validateInput(v, 'percent'))}
              validation="percent"
              validateInput={validateInput}
              onEditStart={clearAllTimers}
              onEditEnd={() => {
                if (editedCells.length > 0) scheduleCountdown();
              }}
            />
            <EditableCell
              value={row.number}
              onChange={v => updateCell(row.id, 'number', validateInput(v, 'number'))}
              validation="number"
              validateInput={validateInput}
              onEditStart={clearAllTimers}
              onEditEnd={() => {
                if (editedCells.length > 0) scheduleCountdown();
              }}
            />
            <EditableCell
              value={row.combined}
              onChange={v => updateCell(row.id, 'combined', v)}
              validation="combined"
              validateInput={validateInput}
              onEditStart={clearAllTimers}
              onEditEnd={() => {
                if (editedCells.length > 0) scheduleCountdown();
              }}
            />
          </div>
        ))}
      </div>

      {/* Прогресс-бар */}
      {intervalRef.current && (
        <div style={progressContainer}>
          <div style={{ ...progressBar, width: `${progressWidth}%` }} />
          <span style={{ marginLeft: 10, fontSize: 18 }}>{countdown}</span>
        </div>
      )}

      <button
        onClick={handleSave}
        style={buttonStyle}
        disabled={editedCells.length === 0}
      >
        Сохранить изменения
      </button>
    </div>
  );
};

// Стили
const tableStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 20
};
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: 8,
  background: '#f2f2f2',
  borderBottom: '1px solid #ddd'
};
const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: 8,
  borderBottom: '1px solid #ddd'
};
const progressContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20
};
const progressBar = {
  height: 20,
  backgroundColor: '#4caf50',
  borderRadius: 5,
  transition: 'width 0.3s linear'
};
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: 5,
  margin: '20px auto',
  display: 'block'
};

export default App;
