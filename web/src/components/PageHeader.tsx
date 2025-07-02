import React from 'react';
import { Button } from 'react-bootstrap';
import './PageHeader.css';

interface PageHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, buttonText, onButtonClick }) => {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      <Button variant="primary" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default PageHeader;