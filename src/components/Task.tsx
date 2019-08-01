import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Check from './CheckCircle';
import Button from './Button';
import Input from './elements/Input';

import * as colors from '../constants/colors';
import * as styles from '../constants/styles';

const Styled = styled.div`
  border-bottom: 1px solid ${colors.GRAY_2()};
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 2rem auto 4rem;
  grid-gap: 2rem;

  .checkmark {
    cursor: pointer;
    opacity: 0.5;
    transition: 250ms all;
  }
  .checkmark:hover,
  &.checked .checkmark {
    opacity: 1;
  }
  .checkmark svg {
    width: 2rem;
    height: 2rem;
  }
  .summary__text {
    margin-bottom: 0.5rem;
  }
  .summary__date {
    font-size: 0.7rem;
  }
  .summary__date span {
    color: ${colors.GRAY_4()};
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-right: 0.5rem;
  }
  .summary__date input {
    font: inherit;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: ${styles.BOX_SHADOW};
    border-radius: 5px;
    padding: 0.5rem 0.75rem;
    transition: 250ms all;
    outline: none;
    width: 100%;
    font-size: 0.8rem;
  }
  .save {
    display: flex;
    justify-content: flex-end;
  }
  .save button {
    height: fit-content;
  }
`;

interface IProps {
  date?: string;
  summary?: string;
  editing?: boolean;
  completed?: boolean;
}

const Logo: React.FC<IProps> = props => {
  const { editing, completed } = props;

  const [summary, setSummary] = useState(props.summary || '');
  const [date, setDate] = useState<null | Date>(
    props.date ? new Date(props.date) : new Date()
  );

  return (
    <Styled className={completed ? 'checked' : 'unchecked'}>
      <div className="checkmark">
        <Check fill={completed ? colors.GREEN() : colors.GRAY_2()} />
      </div>
      <div className="summary">
        {editing ? (
          <Input
            value={summary}
            onChange={val => setSummary(val)}
            style={{ marginBottom: '1rem' }}
          />
        ) : (
          <p className="summary__text">
            Add users to the database in order to test out the newly deployed
            staging environment.
          </p>
        )}
        <div className="summary__date">
          <span>Due On</span>
          {editing ? (
            <DatePicker selected={date} onChange={d => setDate(d)} />
          ) : (
            <strong>February 4, 2019</strong>
          )}
        </div>
      </div>
      <div className="save">{editing && <Button>Save</Button>}</div>
    </Styled>
  );
};

export default Logo;
