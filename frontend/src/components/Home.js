import React, { useState, useRef } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fade,
  styled,
  Alert,
  Collapse
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  CompareArrows as CompareIcon,
  Cancel as CancelIcon,
  ShoppingBag as ProductIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import axios from 'axios';
import Constants from '../Constants';

const AnimatedDots = styled(Box)({
  display: 'inline-block',
  '&::after': {
    content: '"."',
    animation: 'dots 1.5s steps(5, end) infinite',
    fontSize: '24px'
  },
  '@keyframes dots': {
    '0%, 20%': { content: '"."' },
    '40%': { content: '".."' },
    '60%': { content: '"..."' },
    '80%, 100%': { content: '"...."' }
  }
});

const Home = () => {
  const [product1, setProduct1] = useState('');
  const [product2, setProduct2] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [error, setError] = useState(null);
  const cancelRequest = useRef(null);
  const navigate = useNavigate();
  const backendUrl = Constants.BACKEND_URL;

  const isValidFlipkartUrl = (url) => {
    if (!url) return false;
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      return parsedUrl.hostname.includes('flipkart.com');
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate URLs
    if (!isValidFlipkartUrl(product1) || !isValidFlipkartUrl(product2)) {
      setError('Currently we only support Flipkart products comparison. We will soon be supporting other platforms as well. Sorry for the inconvenience caused.');
      return;
    }

    setLoading(true);
    
    try {
      const source = axios.CancelToken.source();
      cancelRequest.current = source;
      
      const response = await axios.post(
        `${backendUrl}generate_response/`, 
        { product1, product2 },
        { cancelToken: source.token }
      );
      
      navigate('/comparison', { state: { comparisonData: response.data } });
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error(err);
        setError('An error occurred while processing your request. Please try again.');
      }
    } finally {
      setLoading(false);
      cancelRequest.current = null;
    }
  };

  const handleCancel = () => {
    if (cancelRequest.current) {
      cancelRequest.current.cancel('Request cancelled by user');
    }
    setLoading(false);
    setOpenCancelDialog(false);
  };

  return (
    <Container maxWidth="sm">
      {/* Loading Overlay */}
      <Dialog 
        open={loading} 
        fullWidth 
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            backgroundColor: 'background.paper'
          }
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            Processing your request
            <AnimatedDots />
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Gathering comparison data
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={() => setOpenCancelDialog(true)}
            sx={{ mt: 2 }}
          >
            Cancel Request
          </Button>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
      >
        <DialogTitle>Cancel Request?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this comparison request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)}>Continue</Button>
          <Button onClick={handleCancel} color="error" variant="contained">
            Cancel Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Content */}
      <Fade in={!loading} timeout={500}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mt: { xs: 4, md: 8 }, 
          gap: 3 
        }}>
          <Card variant="outlined" sx={{ 
            width: '100%', 
            p: 2, 
            borderRadius: 3,
            borderLeft: '4px solid',
            borderLeftColor: 'primary.main',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                gap: 2
              }}>
                <Avatar sx={{ 
                  bgcolor: 'primary.main', 
                  width: 56, 
                  height: 56 
                }}>
                  <CompareIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" component="h1" sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #1976d2, #4dabf5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Product Comparison
                </Typography>
              </Box>

              {/* Error Alert */}
              <Collapse in={!!error}>
                <Alert 
                  severity="error" 
                  sx={{ mb: 3 }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setError(null)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              </Collapse>
              
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField 
                    fullWidth
                    label="Flipkart Product 1 Link" 
                    variant="outlined"
                    value={product1}
                    onChange={(e) => setProduct1(e.target.value)}
                    required
                    placeholder="https://www.flipkart.com/..."
                    InputProps={{
                      startAdornment: (
                        <ProductIcon color="action" sx={{ mr: 1 }} />
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderWidth: 2
                        }
                      }
                    }}
                  />
                  
                  <TextField 
                    fullWidth
                    label="Flipkart Product 2 Link" 
                    variant="outlined"
                    value={product2}
                    onChange={(e) => setProduct2(e.target.value)}
                    required
                    placeholder="https://www.flipkart.com/..."
                    InputProps={{
                      startAdornment: (
                        <ProductIcon color="action" sx={{ mr: 1 }} />
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderWidth: 2
                        }
                      }
                    }}
                  />
                  
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    disabled={loading}
                    fullWidth
                    size="large"
                    startIcon={!loading && <CompareIcon />}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                        Comparing...
                      </>
                    ) : 'Compare Products'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
          
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Currently supporting Flipkart products only. Enter two product links to compare.
          </Typography>
        </Box>
      </Fade>
    </Container>
  );
};

export default Home;