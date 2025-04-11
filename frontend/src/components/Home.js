import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Constants from '../Constants';
import axios from 'axios';

const Home = () => {
    const [product1, setProduct1] = useState('');
    const [product2, setProduct2] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const backendUrl = Constants.BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}generate_response/`, { product1, product2 });
            // const data = {
            //     "product_details": [
            //         {
            //             "product_name": "Noise Icon 2 Elite Edition 1.8'' Display with Metallic Body and Bluetooth Calling Smartwatch  (Elite Black Strap, Regular)",
            //             "product_rating": "4.1",
            //             "product_price": "₹1,599"
            //         },
            //         {
            //             "product_name": "Noise Icon 4 with Stunning 1.96'' AMOLED Display, Metallic Finish, BT Calling Smartwatch  (Rose Pink Strap, Regular)",
            //             "product_rating": "4.1",
            //             "product_price": "₹1,999"
            //         }
            //     ],
            //     "highlights": [
            //         [
            //             "1.8\" LCD display",
            //             "Bluetooth Calling Smartwatch with AI voice assistance",
            //             "Noise Health SuiteTM: Blood Oxygen, 24*7 Heart rate monitor, Stress Monitor and Sleep Monitor",
            //             "60 Sports mode & 100+ watch faces",
            //             "NoiseFit app: Pair with the improved Noisefit app for better health insights",
            //             "With Call Function",
            //             "Touchscreen",
            //             "Fitness & Outdoor",
            //             "Battery Runtime: Upto 7 days"
            //         ],
            //         [
            //             "1.96\" AMOLED display with Always on Display: Larger than life visuals encapsulated within a stunning, vibrant display, makes for all eyes on the screen.",
            //             "Noise Health Suite: Your health and wellness champion, boasting of meticulous data tracking across metrics such as heart rate monitoring, sleep monitoring, stress monitoring, and much more.",
            //             "AI Voice Assistance: Watching and learning is old news. How about an in-ear expert instead? AI Voice Assistance enabled for convenience at a tap.",
            //             "QR Code Payments: Get instantaneous payments at a flick of your wrist. Password Protection: Your data, safe within your hands. Stay secure with enabled password protection.",
            //             "Up to 7 days of battery: Fresh on the juice that goes on and on, and lasts up to 2 days with BT calling.",
            //             "With Call Function",
            //             "Touchscreen",
            //             "Fitness & Outdoor",
            //             "Battery Runtime: Upto 7 days"
            //         ]
            //     ],
            //     "specifications": [
            //         {
            //             "Audio And Video Features": {
            //                 "Speaker": "Yes",
            //                 "Voice Control": "Yes",
            //                 "Gesture Control": "Change Music, Answer Calls",
            //                 "Microphone": "Yes"
            //             },
            //             "Warranty": {
            //                 "Not Covered in Warranty": "Physical Damage",
            //                 "Warranty Service Type": "Contact - productfeedback@nexxbase.com | support.gonoise.com | +91 8882132132",
            //                 "Covered in Warranty": "Manufacturing Defects",
            //                 "Warranty Summary": "1 Year Manufacturer Warranty",
            //                 "Domestic Warranty": "1 Year"
            //             },
            //             "General": {
            //                 "Water Resistant": "Yes",
            //                 "Model Name": "Icon 2 Elite Edition 1.8'' Display with Metallic Body and Bluetooth Calling",
            //                 "Brand Strap Color": "Elite Black",
            //                 "Model Number": "wrb-sw-colorfiticon2-mtl-blk_blk",
            //                 "Usage": "Fitness & Outdoor",
            //                 "Dial Color": "Black",
            //                 "Sales Package": "Smartwatch, Magnetic Charger, User Manual, Warranty Card",
            //                 "Size": "Regular",
            //                 "Strap Material": "Stainless steel",
            //                 "Strap Color": "Black",
            //                 "Dial Material": "Metal",
            //                 "Touchscreen": "Yes",
            //                 "Dial Shape": "Rectangle",
            //                 "Ideal For": "Men & Women",
            //                 "Compatible OS": "Android & iOS"
            //             },
            //             "Product Details": {
            //                 "Rechargeable Battery": "Yes",
            //                 "Notification": "Smart Notifications (Calls, Text, Email, Social Media App Alerts, Weather), Alarm Clock, Calendar Alerts)",
            //                 "Charger Type": "Magnetic Charger",
            //                 "Battery Life": "Upto 7 days",
            //                 "Notification Type": "Vibration",
            //                 "Closure": "N/A",
            //                 "Sensor": "Heart Rate, SpO2",
            //                 "Compatible Device": "iPhone, Android Smartphones"
            //             },
            //             "Fitness And Watch Functions": {
            //                 "Heart Rate Monitor": "Yes",
            //                 "Calendar": "Yes",
            //                 "Alarm Clock": "Yes",
            //                 "Date & Time Display": "Yes",
            //                 "Calorie Count": "Yes",
            //                 "Step Count": "Yes"
            //             },
            //             "Connectivity Features": {
            //                 "Bluetooth": "Yes",
            //                 "Call Function": "Yes",
            //                 "Email Support": "Yes",
            //                 "Operating Range": "10 m",
            //                 "Call Features": "Reject Calls, Take Calls, Speed Dial",
            //                 "Messaging Support": "Yes"
            //             },
            //             "Camera And Display Features": {
            //                 "Display Size": "1.8 inch",
            //                 "Display Resolution": "240 x 286 pixel",
            //                 "Display Type": "N/A",
            //                 "Scratch Resistant": "No"
            //             }
            //         },
            //         {
            //             "Audio And Video Features": {
            //                 "Speaker": "Yes",
            //                 "Voice Control": "N/A",
            //                 "Gesture Control": "N/A",
            //                 "Microphone": "Yes"
            //             },
            //             "Warranty": {
            //                 "Not Covered in Warranty": "Physical Damage",
            //                 "Warranty Service Type": "Contact - help@nexxbase.com | support.gonoise.in | +91 8882132132",
            //                 "Covered in Warranty": "Manufacturing Defects",
            //                 "Warranty Summary": "1 Year Manufacturer Warranty",
            //                 "Domestic Warranty": "1 Year"
            //             },
            //             "General": {
            //                 "Water Resistant": "Yes",
            //                 "Model Name": "Icon 4 with Stunning 1.96'' AMOLED Display, Metallic Finish, BT Calling",
            //                 "Brand Strap Color": "Rose Pink",
            //                 "Model Number": "wrb-sw-colorfiticon4-std-gld_pnk",
            //                 "Usage": "Fitness & Outdoor",
            //                 "Dial Color": "Gold",
            //                 "Sales Package": "Smartwatch, Magnetic Charger, User Manual, Warranty Card",
            //                 "Size": "Regular",
            //                 "Strap Material": "Silicone",
            //                 "Strap Color": "Pink",
            //                 "Dial Material": "Polycarbonate",
            //                 "Touchscreen": "Yes",
            //                 "Dial Shape": "Rectangle",
            //                 "Ideal For": "Women",
            //                 "Compatible OS": "Android & iOS"
            //             },
            //             "Product Details": {
            //                 "Rechargeable Battery": "Yes",
            //                 "Notification": "Yes",
            //                 "Charger Type": "N/A",
            //                 "Battery Life": "Upto 7 days",
            //                 "Notification Type": "N/A",
            //                 "Closure": "Buckle",
            //                 "Sensor": "Heart Rate, SpO2",
            //                 "Compatible Device": "N/A"
            //             },
            //             "Fitness And Watch Functions": {
            //                 "Heart Rate Monitor": "Yes",
            //                 "Calendar": "N/A",
            //                 "Alarm Clock": "Yes",
            //                 "Date & Time Display": "Yes",
            //                 "Calorie Count": "Yes",
            //                 "Step Count": "Yes"
            //             },
            //             "Connectivity Features": {
            //                 "Bluetooth": "Yes",
            //                 "Call Function": "Yes",
            //                 "Email Support": "N/A",
            //                 "Operating Range": "10 m",
            //                 "Call Features": "N/A",
            //                 "Messaging Support": "N/A"
            //             },
            //             "Camera And Display Features": {
            //                 "Display Size": "49.784 mm",
            //                 "Display Resolution": "410 x 502 pixel",
            //                 "Display Type": "AMOLED",
            //                 "Scratch Resistant": "N/A"
            //             }
            //         }
            //     ],
            //     "conclusion": "Both the Noise Icon 2 Elite Edition and the Noise Icon 4 are feature-rich smartwatches, offering a range of capabilities for health and fitness enthusiasts. Here's a comparative analysis to determine which one might be considered better:\n\n**Display and Design:**\n- Noise Icon 2 Elite Edition: This smartwatch features a 1.8-inch LCD display, which is slightly smaller than the Icon 4. It has a metallic body and an Elite Black stainless steel strap, giving it a sleek and durable look.\n- Noise Icon 4: It boasts a larger 1.96-inch AMOLED display with an Always-On feature, providing vibrant and crisp visuals. The Rose Pink silicone strap and metallic finish give it a stylish and modern appearance.\n\n**Health and Fitness Tracking:**\nBoth watches are well-equipped in this department, offering:\n- Heart Rate Monitoring\n- Blood Oxygen (SpO2) Tracking\n- Stress Monitoring\n- Sleep Monitoring\n- 60 Sports Modes (Icon 2) and Calorie/Step Count (both watches)\n\n**Smart Features:**\n- AI Voice Assistance: Both watches offer this feature, allowing for convenient voice-based interactions.\n- Call Function: The Icon 2 provides more call-related features, including the ability to reject and take calls, and speed dial.\n- Notifications: Both watches support smart notifications for calls, texts, emails, and social media alerts. The Icon 4 has a more generic notification feature listed.\n- Battery Life: They both claim up to 7 days of battery runtime, with the Icon 4 specifying that this includes 2 days with BT calling.\n\n**Connectivity and Compatibility:**\n- Both watches are compatible with Android and iOS devices, ensuring a wide range of users can utilize their features.\n- They both offer Bluetooth connectivity and have a 10-meter operating range.\n\n**Additional Features:**\n- Noise Icon 2 Elite Edition: It comes with 100+ customizable watch faces and pairs with the NoiseFit app for enhanced health insights.\n- Noise Icon 4: This model includes QR code payment support and password protection for added convenience and security.\n\n**Conclusion:**\nWhile both smartwatches offer a comprehensive set of features, the Noise Icon 4 might be considered the better choice for several reasons. Its larger and more advanced AMOLED display provides a superior visual experience, and the Always-On feature is a significant advantage for quick glances at the time and notifications. The Icon 4 also introduces QR code payments, adding a layer of convenience for users. Additionally, the slightly higher price point of the Icon 4 could be justified by its more modern design, advanced display technology, and additional features. \n\nHowever, the choice between the two ultimately depends on individual preferences. If a metallic body, more call-related features, and a wider range of watch faces are more important, the Icon 2 Elite Edition could still be the preferred option for some users."
            // };
            navigate('/comparison', { state: { comparisonData: response.data } });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    mt: 8, 
                    gap: 2 
                }}
            >
                <Typography variant="h4" component="h1">
                    Product Comparison
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField 
                            fullWidth
                            label="Product 1" 
                            variant="outlined"
                            value={product1}
                            onChange={(e) => setProduct1(e.target.value)}
                            required
                        />
                        <TextField 
                            fullWidth
                            label="Product 2" 
                            variant="outlined"
                            value={product2}
                            onChange={(e) => setProduct2(e.target.value)}
                            required
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            disabled={loading}
                            fullWidth
                            sx={{ py: 1.5 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Compare Products'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Home;