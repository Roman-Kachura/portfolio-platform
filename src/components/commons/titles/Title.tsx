import React from 'react';
import './titles.scss';

export const Title: React.FC<{ title: string }> = ({title}) => <h2 className='title'>{title}</h2>