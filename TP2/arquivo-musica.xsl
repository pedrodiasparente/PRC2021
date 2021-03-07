<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xd"
    version="1.0">
    <xd:doc scope="stylesheet">
        <xd:desc>
            <xd:p><xd:b>Created on:</xd:b> Mar 6, 2021</xd:p>
            <xd:p><xd:b>Author:</xd:b> pdp</xd:p>
            <xd:p>Conversão do arquivo musical de XML para TTL</xd:p>
        </xd:desc>
    </xd:doc>
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="obra">
        ###  http://www.di.uminho.pt/prc2021/tpc2#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
                        :obra ;
                    :temCompositor :<xsl:value-of select="translate(compositor, ', ','-')"/> ;
                    :tipo "<xsl:value-of select="tipo"/>" ;
                    :titulo "<xsl:value-of select="titulo"/>" .
        #--------------------------------------------------------------
        
        ###  http://www.di.uminho.pt/prc2021/tpc2#<xsl:value-of select="translate(compositor, ', ','-')"/>
        :<xsl:value-of select="translate(compositor, ', ','-')"/> rdf:type owl:NamedIndividual ,
                        :compositor ;
                    :nome "<xsl:value-of select="compositor"/>" .
        #--------------------------------------------------------------
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="instrumentos">
        <xsl:for-each select="instrumento">
            ###  http://www.di.uminho.pt/prc2021/tpc2#<xsl:value-of select="substring-before(partitura/@path,'.')"/>
            :<xsl:value-of select="substring-before(partitura/@path,'.')"/> rdf:type owl:NamedIndividual ,
                            :instrumento ;
                        :temObra :<xsl:value-of select="../../@id"/> ;
                        :temPartitura :<xsl:value-of select="substring-before(partitura/@path,'.')"/>-partitura ;
                        :designacao "<xsl:value-of select="designacao"/>" .
            #--------------------------------------------------------------
            
            ###  http://www.di.uminho.pt/prc2021/tpc2#<xsl:value-of select="substring-before(partitura/@path,'.')"/>-partitura
            :<xsl:value-of select="substring-before(partitura/@path,'.')"/>-partitura rdf:type owl:NamedIndividual ,
                                :partitura ;
                        :path "<xsl:value-of select="partitura/@path"/>" ;
                        :type "<xsl:value-of select="partitura/@type"/>" .
            #--------------------------------------------------------------
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template match="tipo"/>
    <xsl:template match="titulo"/>
    <xsl:template match="compositor"/>
    <xsl:template match="arranjo"/>
    <xsl:template match="subtitulo"/>
    <xsl:template match="editado"/>
    
</xsl:stylesheet>