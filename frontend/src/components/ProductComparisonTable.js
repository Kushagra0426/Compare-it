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
  ListItemText,
  Avatar,
  Chip,
  Divider,
  Stack,
  Grid,
  Card,
  CardContent,
  Rating,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  MonetizationOn as PriceIcon,
  StarBorder as RatingIcon,
  FeaturedPlayList as HighlightsIcon,
  Description as SpecsIcon,
  RateReview as ReviewsIcon,
  AssignmentTurnedIn as ConclusionIcon
} from '@mui/icons-material';

const ProductComparisonTable = ({ data }) => {
  const { product_details, highlights, specifications, conclusion, reviews } = data;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderHighlights = (highlights) => (
    <List dense sx={{ py: 0 }}>
      {highlights.map((highlight, index) => (
        <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CheckCircleIcon color="success" fontSize="small" />
            <ListItemText 
              primary={highlight} 
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </Stack>
        </ListItem>
      ))}
    </List>
  );

  const renderSpecificationSection = (title, spec1, spec2) => {
    return Object.keys(spec1).map((key) => (
      <TableRow key={key} hover>
        <TableCell 
          component="th" 
          scope="row" 
          sx={{ 
            backgroundColor: 'grey.100', 
            fontWeight: 'bold',
            borderLeft: `4px solid ${theme.palette.primary.main}`
          }}
        >
          {key}
        </TableCell>
        <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
          {spec1[key] || 'N/A'}
        </TableCell>
        <TableCell>{spec2[key] || 'N/A'}</TableCell>
      </TableRow>
    ));
  };

  const renderReviews = (reviews) => {
    return (
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ReviewsIcon color="primary" sx={{ mr: 1 }} />
          Top Customer Reviews
        </Typography>
        <Grid container spacing={3}>
          {reviews.map((productReviews, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                    {product_details[index].product_name}
                  </Typography>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Rating 
                      value={parseFloat(product_details[index].product_rating)} 
                      precision={0.5} 
                      readOnly 
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={`${product_details[index].product_rating}/5`} 
                      color="primary" 
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <List sx={{ py: 0 }}>
                    {productReviews.map((review, reviewIndex) => (
                      <React.Fragment key={reviewIndex}>
                        <ListItem alignItems="flex-start" sx={{ 
                          flexDirection: 'column', 
                          alignItems: 'flex-start',
                          py: 2,
                          px: 0
                        }}>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Avatar sx={{ 
                              bgcolor: theme.palette.mode === 'light' ? 
                                theme.palette.primary.light : 
                                theme.palette.primary.dark,
                              color: theme.palette.primary.contrastText,
                              width: 32,
                              height: 32
                            }}>
                              {review.review_rating}
                            </Avatar>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {review.review_title}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {review.review_text}
                          </Typography>
                        </ListItem>
                        {reviewIndex < productReviews.length - 1 && (
                          <Divider component="li" sx={{ mx: 0 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderProductHeader = (product, index) => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row', 
      alignItems: 'center',
      gap: 2
    }}>
      <Avatar 
        src={product.product_image} 
        alt={product.product_name}
        sx={{ 
          width: 60, 
          height: 60,
          bgcolor: theme.palette.grey[200],
          color: theme.palette.text.primary
        }}
      >
        {product.product_name.charAt(0)}
      </Avatar>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {product.product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.product_brand}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      maxWidth: '100%', 
      overflowX: 'auto',
      backgroundColor: theme.palette.background.default
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        mb: 4,
        display: 'flex',
        alignItems: 'center'
      }}>
        <HighlightsIcon sx={{ mr: 1 }} />
        Product Comparison
      </Typography>
      
      <TableContainer 
        component={Paper} 
        elevation={3}
        sx={{ 
          borderRadius: 2,
          mb: 4,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                backgroundColor: theme.palette.mode === 'light' ? 
                  theme.palette.grey[300] : 
                  theme.palette.grey[800],
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                <SpecsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Parameter
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: theme.palette.mode === 'light' ? 
                  theme.palette.grey[200] : 
                  theme.palette.grey[700],
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                {renderProductHeader(product_details[0])}
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: theme.palette.mode === 'light' ? 
                  theme.palette.grey[200] : 
                  theme.palette.grey[700],
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                {renderProductHeader(product_details[1])}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell component="th" scope="row" sx={{ 
                backgroundColor: 'grey.100', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                borderLeft: `4px solid ${theme.palette.secondary.main}`
              }}>
                <PriceIcon color="secondary" sx={{ mr: 1 }} />
                Price
              </TableCell>
              <TableCell sx={{ 
                borderRight: '1px solid rgba(224, 224, 224, 1)',
                fontWeight: 'bold',
                color: theme.palette.success.dark
              }}>
                {product_details[0].product_price}
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold',
                color: theme.palette.success.dark
              }}>
                {product_details[1].product_price}
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell component="th" scope="row" sx={{ 
                backgroundColor: 'grey.100', 
                fontWeight: 'bold',
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
                display: 'flex',
                alignItems: 'center'
              }}>
                <RatingIcon color="secondary" sx={{ mr: 1 }} />
                Rating
              </TableCell>
              <TableCell sx={{ 
                borderRight: '1px solid rgba(224, 224, 224, 1)',
                whiteSpace: 'nowrap'
              }}>
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 1 }}>
                  <Rating 
                    value={parseFloat(product_details[0].product_rating)} 
                    precision={0.5} 
                    readOnly 
                    size="small"
                  />
                </Box>
                {product_details[0].product_rating}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 1 }}>
                  <Rating 
                    value={parseFloat(product_details[1].product_rating)} 
                    precision={0.5} 
                    readOnly 
                    size="small"
                  />
                </Box>
                {product_details[1].product_rating}
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell component="th" scope="row" sx={{ 
                backgroundColor: 'grey.100', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                borderLeft: `4px solid ${theme.palette.secondary.main}`
              }}>
                <HighlightsIcon color="secondary" sx={{ mr: 1 }} />
                Key Highlights
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                {renderHighlights(highlights[0])}
              </TableCell>
              <TableCell>
                {renderHighlights(highlights[1])}
              </TableCell>
            </TableRow>
            {Object.keys(specifications[0]).map((section) => (
              <React.Fragment key={section}>
                <TableRow>
                  <TableCell colSpan={3} sx={{ 
                    backgroundColor: theme.palette.mode === 'light' ? 
                      theme.palette.grey[300] : 
                      theme.palette.grey[800],
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <SpecsIcon sx={{ mr: 1 }} />
                    {section}
                  </TableCell>
                </TableRow>
                {renderSpecificationSection(
                  section,
                  specifications[0][section],
                  specifications[1][section]
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {reviews && renderReviews(reviews)}

      <Card variant="outlined" sx={{ mt: 6, borderLeft: `4px solid ${theme.palette.primary.main}` }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: theme.palette.primary.main
          }}>
            <ConclusionIcon sx={{ mr: 1 }} />
            Conclusion
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {conclusion}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductComparisonTable;