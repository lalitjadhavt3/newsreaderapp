// src/styles/styles.ts
import { StyleSheet } from 'react-native';
import { primaryColors, neutralColors, accentColors } from './colors';

const styles = StyleSheet.create({
  // Common Styles
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColors.primary500,
  },
  subHeader: {
    fontSize: 18,
    color: neutralColors.neutral500,
  },

  // Primary Color Usage
  primaryButton: {
    backgroundColor: primaryColors.primary500,
    padding: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: accentColors.white,
    textAlign: 'center',
    fontSize: 16,
  },

  // Neutral Color Usage
  neutralText: {
    color: neutralColors.neutral400,
    fontSize: 16,
  },
  neutralBackground: {
    backgroundColor: neutralColors.neutral100,
    padding: 10,
    borderRadius: 8,
  },

  // Accent Colors (Success, Warning, Error, Info)
  successMessage: {
    backgroundColor: accentColors.success,
    padding: 8,
    borderRadius: 8,
  },
  warningMessage: {
    backgroundColor: accentColors.warning,
    padding: 8,
    borderRadius: 8,
  },
  errorMessage: {
    backgroundColor: accentColors.error,
    padding: 8,
    borderRadius: 8,
  },
  infoMessage: {
    backgroundColor: accentColors.information,
    padding: 8,
    borderRadius: 8,
  },

  // Text Styles
  textPrimary: {
    color: primaryColors.primary500,
    fontSize: 16,
  },
  textSecondary: {
    color: neutralColors.neutral500,
    fontSize: 14,
  },
  textAccent: {
    color: accentColors.white,
    fontSize: 16,
  },
});

export default styles;
