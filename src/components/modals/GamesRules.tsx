import React, { useEffect } from 'react';
import { GAME_RULES, CLOSE } from '../../constants/constants';
import { Modal, Button, Skeleton } from 'antd';

interface GamesRulesProps {
    isOpen: boolean;
    language: 'en' | 'th';
    closeModal: () => void;
}

interface Rule {
    en: string;
    th: string;
    subRules?: { [key: string]: SubRule };
}

interface SubRule {
    en: string;
    th: string;
}

const isRuleWithSubRules = (rule: Rule): rule is Rule & { subRules: { [key: string]: SubRule } } => {
    return rule.subRules !== undefined;
};

const GamesRules: React.FC<GamesRulesProps> = ({ isOpen, language, closeModal }) => {
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // ปรับเวลารอโหลด (เช่น 2000ms)
        
        return () => clearTimeout(timer); // เคลียร์ timeout เมื่อคอมโพเนนต์ถูกยกเลิก
    }, []);

    return (
        <Modal
            title={GAME_RULES.TITLE[language]}
            open={isOpen}
            onCancel={closeModal}
            footer={[
                <Button key="close" onClick={closeModal}>
                    {CLOSE[language]}
                </Button>
            ]}
            className="text-gray-10"
        >
            <div className="py-4 text-gray-600 max-h-[400px] overflow-auto">
                {loading ? (
                    // แสดง Skeleton ขณะโหลด
                    <>
                        <Skeleton active paragraph={{ rows: 4 }} />
                        <Skeleton active paragraph={{ rows: 3 }} />
                        <Skeleton active paragraph={{ rows: 4 }} />
                    </>
                ) : (
                    // แสดงกฎเมื่อไม่โหลด
                    <>
                        {/* กฎพื้นฐาน */}
                        <h3 className="text-md font-semibold">{GAME_RULES.BASIC_RULES.title[language]}</h3>
                        <ol className="list-decimal list-inside pl-4 space-y-2">
                            {Object.entries(GAME_RULES.BASIC_RULES.rules).map(([key, rule]) => (
                                <li key={key}>
                                    {rule[language]}
                                    {isRuleWithSubRules(rule) && (
                                        <ul className="list-disc list-inside pl-4 space-y-1">
                                            {Object.entries(rule.subRules).map(([subKey, subRule]) => (
                                                <li key={subKey}>{subRule[language]}</li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ol>

                        {/* กฎคะแนน */}
                        <h3 className="mt-4 text-md font-semibold">{GAME_RULES.SCORING_RULES.title[language]}</h3>
                        <ol className="list-decimal list-inside pl-4 space-y-2">
                            {Object.entries(GAME_RULES.SCORING_RULES.rules).map(([key, rule]) => (
                                <li key={key}>
                                    {rule[language]}
                                    {isRuleWithSubRules(rule) && (
                                        <ul className="list-disc list-inside pl-4 space-y-1">
                                            {Object.entries(rule.subRules).map(([subKey, subRule]) => (
                                                <li key={subKey}>{subRule[language]}</li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ol>

                        {/* ขั้นตอนการเล่น */}
                        <h3 className="mt-4 text-md font-semibold">{GAME_RULES.GAMEPLAY_STEPS.title[language]}</h3>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            {Object.entries(GAME_RULES.GAMEPLAY_STEPS.steps).map(([key, step]) => (
                                <li key={key}>
                                    {step[language]}
                                    {step.subSteps && (
                                        <ol className="list-decimal list-inside pl-4 space-y-1">
                                            {Object.entries(step.subSteps).map(([subKey, subStep]) => (
                                                <li key={subKey}>{subStep[language]}</li>
                                            ))}
                                        </ol>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* ตัวอย่างคะแนน */}
                        <h3 className="mt-4 text-md font-semibold">{GAME_RULES.EXAMPLE_SCORING.title[language]}</h3>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            {GAME_RULES.EXAMPLE_SCORING.example.map((example, index) => (
                                <li key={index}>{example[language]}</li>
                            ))}
                        </ul>

                        {/* หมายเหตุ */}
                        <p className="mt-4 italic">{GAME_RULES.NOTE[language]}</p>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default GamesRules;
