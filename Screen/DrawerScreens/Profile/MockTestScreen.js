import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Ionicons from 'react-native-vector-icons/Ionicons';


const MockTestScreen = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isTimerExpired, setIsTimerExpired] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);


    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
        },
        // Add more questions here
    ];

    // Timer logic
    const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds

    const toggleBottomSheet = () => {
        setBottomSheetVisible(!bottomSheetVisible);
      };

    useEffect(() => {
        if (timeRemaining <= 0) {
            setIsTimerExpired(true);
        }
    }, [timeRemaining]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isTimerExpired) {
                setTimeRemaining(time => time - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isTimerExpired]);

    const handleShowAnswers = () => {
        setBottomSheetVisible(true);
    };

    const handleAnswerSelect = (questionIndex, choice) => {
        if (!isTimerExpired) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionIndex]: choice,
            });
        }
    };

    //   const handleAnswerSelect = (questionIndex, choice) => {
    //     setSelectedAnswers({
    //       ...selectedAnswers,
    //       [questionIndex]: choice,
    //     });
    //   };

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const renderQuestion = (question, index) => {
        const selectedChoice = selectedAnswers[index] || null;
        return (
            <View key={index} style={styles.questionContainer}>
                <Text style={styles.questionText}>{question.question}</Text>
                {question.choices.map((choice, choiceIndex) => (
                    <TouchableOpacity
                        key={choiceIndex}
                        style={[
                            styles.choiceButton,
                            selectedChoice === choice && styles.selectedChoice,
                        ]}
                        onPress={() => handleAnswerSelect(index, choice)}
                    >
                        <Text style={styles.choiceText}>{choice}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };


    const renderSelectedAnswerGrid = () => {
        const numRows = Math.ceil(questions.length / 5);
        const grid = [];

        for (let row = 0; row < numRows; row++) {
            const startIndex = row * 5;
            const endIndex = Math.min(startIndex + 5, questions.length);

            const rowItems = [];

            for (let index = startIndex; index < endIndex; index++) {
                const isSelected = selectedAnswers[index] !== undefined;
                const backgroundColor = isSelected ? 'green' : 'red';

                rowItems.push(
                    <View
                        key={index}
                        style={[styles.gridBox, { backgroundColor , justifyContent:'center'}]}
                    >
                        <Text style={{color:'#fff', alignSelf:'center', textAlign:'center'}}>{''+(index+1)}</Text>
                    </View>
                );
            }

            grid.push(
                <View key={row} style={styles.gridRow}>
                    {rowItems}
                </View>
            );
        }

        return grid;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mock Test</Text>
            <Text style={styles.timer}>
                Timer: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}
            </Text>
            
            {renderQuestion(questions[currentQuestion], currentQuestion)}
            <View style={styles.navigationButtons}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={handlePrevious}
                    disabled={currentQuestion === 0}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={handleNext}
                    disabled={currentQuestion === questions.length - 1}
                >
                    <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <Button title="Show Answers" onPress={handleShowAnswers} />


            <BottomSheet
                visible={bottomSheetVisible}
                onBackButtonPress={() => setBottomSheetVisible(false)}
                backdropPressToClose={true}
            >
                <TouchableOpacity style={styles.closeButton} onPress={toggleBottomSheet}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.bottomSheetContent}>
                    {renderSelectedAnswerGrid()}
                </View>

               
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:20
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
    },
    choiceButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    selectedChoice: {
        backgroundColor: 'lightblue',
    },
    choiceText: {
        fontSize: 16,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    navButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomSheetContent: {
        padding: 20,
        flexDirection: 'column',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        minHeight: '50%', // Half-screen height
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    gridBox: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    closeButton: {
        //position: 'absolute',
        top: 0,
        right: 10,
        left:10
       // zIndex: 1,

      },
});

export default MockTestScreen;