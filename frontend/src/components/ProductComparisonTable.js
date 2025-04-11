import React from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';

const ProductComparisonTable = ({ data }) => {
  const { product_details, highlights, specifications, conclusion } = data;

  const renderHighlights = (highlights) => (
    <List dense>
      {highlights.map((highlight, index) => (
        <ListItem key={index} disableGutters>
          <ListItemText primary={highlight} />
        </ListItem>
      ))}
    </List>
  );

  const renderSpecificationSection = (title, spec1, spec2) => {
    return Object.keys(spec1).map((key) => (
      <TableRow key={key}>
        <TableCell component="th" scope="row" sx={{ backgroundColor: 'grey.200', fontWeight: 'bold' }}>{key}</TableCell>
        <TableCell sx={{borderRight: '1px solid rgba(224, 224, 224, 1)'}}>{spec1[key] || 'N/A'}</TableCell>
        <TableCell>{spec2[key] || 'N/A'}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '100%', overflowX: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Product Comparison
      </Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'grey.500', fontWeight: 'bold' }}>Parameter</TableCell>
              <TableCell sx={{ backgroundColor: 'grey.400', fontWeight: 'bold' }}>{product_details[0].product_name}</TableCell>
              <TableCell sx={{ backgroundColor: 'grey.400', fontWeight: 'bold' }}>{product_details[1].product_name}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: 'grey.200', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{product_details[0].product_price}</TableCell>
              <TableCell>{product_details[1].product_price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: 'grey.200', fontWeight: 'bold' }}>Rating</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{product_details[0].product_rating}</TableCell>
              <TableCell>{product_details[1].product_rating}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: 'grey.200', fontWeight: 'bold' }}>Key Highlights</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{renderHighlights(highlights[0])}</TableCell>
              <TableCell>{renderHighlights(highlights[1])}</TableCell>
            </TableRow>
            {Object.keys(specifications[0]).map((section) => (
              <>
                <TableRow key={section}>
                  <TableCell colSpan={3} sx={{ 
                    backgroundColor: 'grey.500', 
                    fontWeight: 'bold' 
                  }}>
                    {section}
                  </TableCell>
                </TableRow>
                {renderSpecificationSection(
                  section,
                  specifications[0][section],
                  specifications[1][section]
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Conclusion
        </Typography>
        <Typography variant="body1">{conclusion}</Typography>
      </Box>
    </Box>
  );
};

export default ProductComparisonTable;