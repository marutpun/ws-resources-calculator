import * as React from 'react';
import type { InitDefs, ResourceDefs } from './defs/type.tsx';

const resourceList: ResourceDefs[] = [
  { name: 'meat', rate: 1 },
  { name: 'wood', rate: 1 },
  { name: 'iron', rate: 0.2 },
  { name: 'coal', rate: 0.05 },
];

const initialValues: InitDefs = {
  meat: '',
  wood: '',
  coal: '',
  iron: '',
};

export default function App() {
  const goal: number = 10000;
  const [values, setValues] = React.useState<InitDefs>(initialValues);

  const handleInputResource = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    if (value === '' || !isNaN(parseFloat(value))) {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const parseValue = (value: string) => parseFloat(value) || 0;

  return (
    <main className="container">
      <h1 className="text-center">Whiteout Survival Resources Ratio Calculator</h1>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <table className="table table-bordered" style={{ maxWidth: '40rem' }}>
          <thead>
          <tr>
            <th scope="col" className="text-center w-25">
              Type
            </th>
            <th scope="col" className="text-center w-25">
              Goal
            </th>
            <th scope="col" className="text-center w-25">
              Current
            </th>
            <th scope="col" className="text-center w-25">
              Percentage
            </th>
          </tr>
          </thead>
          <tbody>
          {resourceList.map((resource: ResourceDefs) => {
            const { name, rate } = resource;
            const fullNameCaps: string = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <tr key={name}>
                <td>{fullNameCaps}</td>
                <td>{(goal * rate).toLocaleString()}</td>
                <td>
                  <label htmlFor={name + 'Input'} className="visually-hidden">
                    {fullNameCaps}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={name + 'Input'}
                    name={name}
                    placeholder={fullNameCaps}
                    onChange={handleInputResource}
                    value={values[name as keyof InitDefs]}
                  />
                </td>
                <td>{((parseValue(values[name as keyof InitDefs]) / (goal * rate)) * 100).toFixed(2)}%</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
