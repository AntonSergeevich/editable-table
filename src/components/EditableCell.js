import React, { useState, useRef, useEffect } from 'react';

const EditableCell = ({
  className,
  value,
  onChange,
  validation,
  validateInput,
  onEditStart,
  onEditEnd
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);
  const inputRef = useRef(null);

  // Синхронизация внешнего value с локальным state
  useEffect(() => {
    setCellValue(value);
  }, [value]);

  // Фокус и курсор в конец при входе в редакт
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleEdit = () => {
    onEditStart?.();    // сбросить/скрыть прогресс-бар сразу
    setCellValue(value);
    setIsEditing(true);
  };

  const handleChange = e => {
    const raw = e.target.value;
    const valid = validation ? validateInput(raw, validation) : raw;
    setCellValue(valid);
    onChange(valid);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEditEnd?.();      // после окончания редакции — снова запланировать таймер, если нужны правки
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current.blur();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setCellValue(value);
      setIsEditing(false);
      onEditEnd?.();
    }
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      className={className}
      value={cellValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={{
        padding: '8px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
        background: '#fff'
      }}
    />
  ) : (
    <div
      className={className}
      onClick={handleEdit}
      style={{
        padding: '8px',
        border: '1px solid #ddd',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        minWidth: '100px',
        background: '#fafafa'
      }}
    >
      {value}
    </div>
  );
};

export default EditableCell;
