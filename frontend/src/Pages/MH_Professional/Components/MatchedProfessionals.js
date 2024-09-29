import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import '../Styles/matched-professionals.styles.css';

const MatchedProfessionals = () => {
  const { id } = useParams(); // Get questionnaire ID from URL
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const fetchMatchedProfessionals = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/matched-professionals/`);
        // console.log(response.json())
        if (response.ok) {
          const data = await response.json();
          setProfessionals(data.professionals); // Assuming the response has a professionals array
        } else {
          console.error("Failed to fetch matched professionals");
        }
      } catch (error) {
        console.error("Error fetching matched professionals:", error);
      }
    };

    fetchMatchedProfessionals();
  }, [id]);

  return (
    <div className='matched-professionals-container'>
      <center><h1 style={{marginBottom:'5rem'}}>Top Matched Mental Health Professionals For You</h1></center>
      <div className='professionals-list'>
        {professionals.map((prof, index) => (
          <Card key={index} className='professionals-card'>
            {prof.photo && <Card.Img variant="top" src={prof.photo} />}
            <Card.Body>
              <Card.Title>{prof.name}</Card.Title>
              <Card.Text>
                <strong>Therapy Specification:</strong> {prof.therapy_specification}<br />
                <strong>Email:</strong> {prof.email}<br />
                <strong>Ph No.:</strong> {prof.phone}<br />
                <strong>Gender:</strong> {prof.gender}<br />
                <strong>Languages:</strong> {prof.language1} {prof.language2 ? `, ${prof.language2}` : ''} {prof.language3 ? `, ${prof.language3}` : ''}<br />
                <strong>Specialization:</strong> {prof.specialization}
              </Card.Text>
              <Button variant="primary">View Profile</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchedProfessionals;
