import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { UserProfile, HealthRisk, RiskAssessment } from '../../../types';

interface RiskPresentationProps {
  userProfile: UserProfile;
  healthRisks: HealthRisk[];
  riskAssessment: RiskAssessment;
  onBackPress: () => void;
  onBioSystemFilter: (bioSystem: string | null) => void;
  onRiskPress: (riskId: string) => void;
  selectedBioSystem: string | null;
}

export default function RiskPresentation({
  healthRisks,
  riskAssessment,
  onBackPress,
  onBioSystemFilter,
  onRiskPress,
  selectedBioSystem,
}: RiskPresentationProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return '#4CAF50';
      case 'moderate':
        return '#FF9800';
      case 'high':
        return '#FF5722';
      case 'critical':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return '✅';
      case 'moderate':
        return '⚠️';
      case 'high':
        return '🚨';
      case 'critical':
        return '🆘';
      default:
        return '❓';
    }
  };

  const getBioSystemIcon = (bioSystem: string) => {
    switch (bioSystem) {
      case 'cardiovascular':
        return '❤️';
      case 'neurological':
        return '🧠';
      case 'digestive':
        return '🫁';
      case 'musculoskeletal':
        return '🦴';
      case 'endocrine':
        return '🩸';
      case 'respiratory':
        return '🫁';
      default:
        return '🔬';
    }
  };

  const renderOverallRiskCard = () => {
    const overallColor = getRiskColor(riskAssessment.riskLevel);
    const overallIcon = getRiskIcon(riskAssessment.riskLevel);

    return (
      <View style={styles.overallRiskCard}>
        <View style={styles.overallRiskHeader}>
          <Text style={styles.overallRiskTitle}>Overall Health Risk</Text>
          <Text style={styles.assessmentDate}>
            Last assessed: {new Date().toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.overallRiskContent}>
          <View style={styles.riskMeterContainer}>
            <View style={[styles.riskMeter, { borderColor: overallColor }]}>
              <Text style={styles.riskMeterIcon}>{overallIcon}</Text>
              <Text style={[styles.riskScore, { color: overallColor }]}>
                {Math.round(riskAssessment.overallRiskScore)}%
              </Text>
              <Text
                style={[
                  styles.riskLevel,
                  { color: overallColor, fontSize: 10 },
                ]}
              >
                {riskAssessment.riskLevel.toUpperCase()} RISK
              </Text>
            </View>
          </View>

          <View style={styles.riskSummary}>
            <Text style={styles.summaryText}>
              Based on your profile and current wellness habits, you have a{' '}
              <Text style={{ color: overallColor, fontWeight: 'bold' }}>
                {riskAssessment.riskLevel}
              </Text>{' '}
              overall health risk.
            </Text>
            <Text style={styles.improvementText}>
              💡 {Math.round(riskAssessment.improvementPotential).toFixed(2)}%
              improvement potential with better wellness habits!
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBioSystemFilter = () => {
    const bioSystems = [
      { key: null, label: 'All Systems', icon: '🔬' },
      { key: 'cardiovascular', label: 'Cardiovascular', icon: '❤️' },
      { key: 'neurological', label: 'Neurological', icon: '🧠' },
      { key: 'digestive', label: 'Digestive', icon: '🫄' },
      { key: 'musculoskeletal', label: 'Musculoskeletal', icon: '🦴' },
      { key: 'endocrine', label: 'Endocrine', icon: '🩸' },
      { key: 'respiratory', label: 'Respiratory', icon: '🫁' },
    ];

    const renderBioSystemItem: ListRenderItem<(typeof bioSystems)[0]> = ({
      item,
    }) => (
      <TouchableOpacity
        style={[
          styles.bioSystemButton,
          selectedBioSystem === item.key && styles.activeBioSystemButton,
        ]}
        onPress={() => onBioSystemFilter(item.key)}
      >
        <Text style={styles.bioSystemIcon}>{item.icon}</Text>
        <Text
          style={[
            styles.bioSystemText,
            selectedBioSystem === item.key && styles.activeBioSystemText,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={bioSystems}
        renderItem={renderBioSystemItem}
        keyExtractor={item => item.key || 'all'}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bioSystemScrollView}
        contentContainerStyle={styles.bioSystemContainer}
      />
    );
  };

  const renderBioSystemOverview = () => {
    const bioSystemEntries = Object.entries(riskAssessment.bioSystemRisks);

    const renderBioSystemOverviewItem: ListRenderItem<
      [string, { averageRisk: number; riskLevel: string; riskCount: number }]
    > = ({ item: [bioSystem, data] }) => {
      const color = getRiskColor(data.riskLevel);
      const icon = getBioSystemIcon(bioSystem);

      return (
        <TouchableOpacity
          style={styles.bioSystemOverviewCard}
          onPress={() => onBioSystemFilter(bioSystem)}
        >
          <View style={styles.bioSystemOverviewHeader}>
            <Text style={styles.bioSystemOverviewIcon}>{icon}</Text>
            <Text style={styles.bioSystemOverviewTitle}>
              {bioSystem.charAt(0).toUpperCase() + bioSystem.slice(1)}
            </Text>
          </View>
          <View style={styles.bioSystemOverviewStats}>
            <Text style={[styles.bioSystemRiskScore, { color }]}>
              {Math.round(data.averageRisk)}%
            </Text>
            <Text style={styles.bioSystemRiskCount}>
              {data.riskCount} risk{data.riskCount !== 1 ? 's' : ''}
            </Text>
          </View>
          <View
            style={[styles.bioSystemRiskIndicator, { backgroundColor: color }]}
          />
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.bioSystemOverviewContainer}>
        <Text style={styles.sectionTitle}>Bio-System Risk Overview</Text>
        <FlatList
          data={bioSystemEntries}
          renderItem={renderBioSystemOverviewItem}
          keyExtractor={([bioSystem]) => bioSystem}
          numColumns={2}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={styles.bioSystemSeparator} />
          )}
          columnWrapperStyle={styles.bioSystemRow}
        />
      </View>
    );
  };

  const renderRisksList = () => {
    const filteredRisks = selectedBioSystem
      ? healthRisks.filter(risk => risk.bioSystem === selectedBioSystem)
      : healthRisks;

    const renderRiskItem: ListRenderItem<HealthRisk> = ({ item: risk }) => {
      const color = getRiskColor(risk.riskLevel);
      const icon = getRiskIcon(risk.riskLevel);

      return (
        <TouchableOpacity
          style={styles.riskCard}
          onPress={() => onRiskPress(risk.id)}
        >
          <View style={styles.riskCardHeader}>
            <View style={styles.riskTitleContainer}>
              <Text style={styles.riskIcon}>{risk.icon}</Text>
              <View style={styles.riskTitleText}>
                <Text style={styles.riskName}>{risk.name}</Text>
                {risk.organ && (
                  <Text style={styles.riskOrgan}>({risk.organ})</Text>
                )}
              </View>
            </View>
            <View style={styles.riskLevelContainer}>
              <Text style={styles.riskLevelIcon}>{icon}</Text>
              <Text style={[styles.riskPercentage, { color }]}>
                {risk.riskPercentage}%
              </Text>
            </View>
          </View>

          <Text style={styles.riskDescription}>{risk.description}</Text>

          <View style={styles.riskProgressBar}>
            <View
              style={[
                styles.riskProgressFill,
                {
                  width: `${risk.riskPercentage}%`,
                  backgroundColor: color,
                },
              ]}
            />
          </View>

          <View style={styles.riskFactors}>
            <Text style={styles.factorsTitle}>Key Factors:</Text>
            <Text style={styles.factorsText}>
              {risk.factors.slice(0, 2).join(', ')}
              {risk.factors.length > 2 && '...'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.risksListContainer}>
        <Text style={styles.sectionTitle}>
          {selectedBioSystem
            ? `${
                selectedBioSystem.charAt(0).toUpperCase() +
                selectedBioSystem.slice(1)
              } Risks`
            : 'All Health Risks'}
        </Text>
        <FlatList
          data={filteredRisks}
          renderItem={renderRiskItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.riskSeparator} />}
        />
      </View>
    );
  };

  const renderTopRisks = () => {
    const renderTopRiskItem: ListRenderItem<HealthRisk> = ({ item: risk }) => {
      const color = getRiskColor(risk.riskLevel);

      return (
        <View style={[styles.topRiskCard, { borderLeftColor: color }]}>
          <View style={styles.topRiskHeader}>
            <Text style={styles.topRiskIcon}>{risk.icon}</Text>
            <View style={styles.topRiskInfo}>
              <Text style={styles.topRiskName}>{risk.name}</Text>
              <Text style={styles.topRiskBioSystem}>
                {getBioSystemIcon(risk.bioSystem)} {risk.bioSystem}
              </Text>
            </View>
            <Text style={[styles.topRiskPercentage, { color }]}>
              {risk.riskPercentage}%
            </Text>
          </View>
        </View>
      );
    };

    return (
      <View style={styles.topRisksContainer}>
        <Text style={styles.sectionTitle}>Top 3 Risks to Monitor</Text>
        <FlatList
          data={riskAssessment.topRisks}
          renderItem={renderTopRiskItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={styles.topRiskSeparator} />
          )}
        />
      </View>
    );
  };

  const renderRecommendations = () => {
    const recommendations = [
      '🏃‍♂️ Increase daily physical activity to 150+ minutes per week',
      '🥗 Add more fruits and vegetables to your diet',
      '💧 Maintain proper hydration (8+ glasses daily)',
      '😴 Ensure 7-9 hours of quality sleep nightly',
      '🧘‍♂️ Practice stress management techniques',
    ];

    const renderRecommendationItem: ListRenderItem<string> = ({ item }) => (
      <View style={styles.recommendationItem}>
        <Text style={styles.recommendationText}>{item}</Text>
      </View>
    );

    return (
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
        <FlatList
          data={recommendations}
          renderItem={renderRecommendationItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={styles.recommendationSeparator} />
          )}
        />
      </View>
    );
  };

  const mainSections = [
    { id: 'overall', type: 'overall' },
    { id: 'bioSystemFilter', type: 'bioSystemFilter' },
    { id: 'bioSystemOverview', type: 'bioSystemOverview' },
    { id: 'topRisks', type: 'topRisks' },
    { id: 'risksList', type: 'risksList' },
    { id: 'recommendations', type: 'recommendations' },
  ];

  const renderMainSection: ListRenderItem<(typeof mainSections)[0]> = ({
    item,
  }) => {
    switch (item.type) {
      case 'overall':
        return renderOverallRiskCard();
      case 'bioSystemFilter':
        return renderBioSystemFilter();
      case 'bioSystemOverview':
        return renderBioSystemOverview();
      case 'topRisks':
        return renderTopRisks();
      case 'risksList':
        return renderRisksList();
      case 'recommendations':
        return renderRecommendations();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Risk-o-meter</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={mainSections}
        renderItem={renderMainSection}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainContentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a27',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  mainContentContainer: {
    paddingBottom: 20,
  },
  overallRiskCard: {
    margin: 20,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  overallRiskHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  overallRiskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  assessmentDate: {
    fontSize: 14,
    color: '#666',
  },
  overallRiskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  riskMeterContainer: {
    alignItems: 'center',
  },
  riskMeter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  riskMeterIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  riskScore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  riskLevel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  riskSummary: {
    flex: 1,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  improvementText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    lineHeight: 20,
  },
  bioSystemScrollView: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  bioSystemContainer: {
    gap: 12,
  },
  bioSystemButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    minWidth: 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeBioSystemButton: {
    backgroundColor: '#4CAF50',
  },
  bioSystemIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  bioSystemText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  activeBioSystemText: {
    color: 'white',
  },
  bioSystemOverviewContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 16,
  },
  bioSystemRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  bioSystemOverviewCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bioSystemOverviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bioSystemOverviewIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  bioSystemOverviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  bioSystemOverviewStats: {
    alignItems: 'center',
  },
  bioSystemRiskScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bioSystemRiskCount: {
    fontSize: 12,
    color: '#666',
  },
  bioSystemRiskIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 4,
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  bioSystemSeparator: {
    height: 8,
  },
  topRisksContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  topRiskCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topRiskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRiskIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  topRiskInfo: {
    flex: 1,
  },
  topRiskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  topRiskBioSystem: {
    fontSize: 12,
    color: '#666',
  },
  topRiskPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topRiskSeparator: {
    height: 8,
  },
  risksListContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  riskCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  riskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  riskIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  riskTitleText: {
    flex: 1,
  },
  riskName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  riskOrgan: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  riskLevelContainer: {
    alignItems: 'center',
  },
  riskLevelIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  riskPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  riskDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  riskProgressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  riskProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  riskFactors: {
    marginTop: 8,
  },
  factorsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  factorsText: {
    fontSize: 12,
    color: '#888',
  },
  riskSeparator: {
    height: 12,
  },
  recommendationsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  recommendationItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  recommendationSeparator: {
    height: 8,
  },
});
